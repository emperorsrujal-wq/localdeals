# Cloud Run Deployment Troubleshooting

## Common Issues & Solutions

### ❌ Error: "Container failed to start and listen on the port"

**Cause:** Container is not listening on port 8080 that Cloud Run expects.

**Solution:**
1. Ensure backend uses `process.env.PORT` or defaults to 8080
2. Verify `main.ts` has:
   ```typescript
   const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
   await app.listen(port, '0.0.0.0', () => {
     console.log(`API running on port ${port}`);
   });
   ```
3. Use the updated Dockerfile with proper health checks

### ❌ Error: "Container exited or did not start"

**Cause:** Application crashed due to missing environment variables or Firebase issues.

**Solution:**
1. Check Cloud Run logs:
   ```bash
   gcloud run logs read localdeals-api --region us-central1 --limit 50
   ```
2. Verify all .env variables are set in Cloud Run:
   - FIREBASE_PROJECT_ID
   - FIREBASE_PRIVATE_KEY
   - FIREBASE_CLIENT_EMAIL
   - DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
   - JWT_SECRET

3. Test locally first:
   ```bash
   PORT=8080 npm run dev
   curl http://localhost:8080/api/v1/health
   ```

### ❌ Error: "Startup timeout exceeded"

**Cause:** Application takes too long to start.

**Solution:**
1. Increase timeout in deployment:
   ```bash
   gcloud run deploy localdeals-api \
     --timeout 600 \
     ...
   ```
2. Increase memory:
   ```bash
   gcloud run deploy localdeals-api \
     --memory 1Gi \
     ...
   ```
3. Check what's taking long:
   - Database connections
   - Firebase initialization
   - Large dependencies being loaded

### ❌ Error: "Firebase initialization failed"

**Cause:** firebase-admin-key.json not provided or invalid.

**Solution:**
1. The private key file should NOT be in the Docker image
2. Instead, set environment variables in Cloud Run console:
   ```
   FIREBASE_PROJECT_ID=localdeals-4f0bf
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@localdeals-4f0bf.iam.gserviceaccount.com
   ```
3. Or use Google Cloud service account directly

### ❌ Error: "Database connection refused"

**Cause:** Cloud Run container cannot reach PostgreSQL database.

**Solution:**
1. Ensure database is accessible from Cloud Run:
   - If Cloud SQL: use Cloud SQL Proxy
   - If external: open firewall for Cloud Run IP range
2. Use Cloud SQL Connector:
   ```bash
   # In build, add Cloud SQL Proxy sidecar
   gcloud run deploy localdeals-api \
     --add-cloudsql-instances localdeals-db \
     ...
   ```
3. Update DB connection string in Cloud Run environment

### ✅ Correct Deployment Steps

```bash
cd backend

# 1. Test locally
PORT=8080 npm run dev

# 2. Build Docker image
docker build -t localdeals-api:latest .

# 3. Test Docker locally
docker run -p 8080:8080 \
  -e PORT=8080 \
  -e NODE_ENV=production \
  -e FIREBASE_PROJECT_ID=localdeals-4f0bf \
  localdeals-api:latest

# 4. Test endpoint
curl http://localhost:8080/api/v1/health

# 5. Deploy to Cloud Run
gcloud run deploy localdeals-api \
  --source . \
  --platform managed \
  --region us-central1 \
  --memory 512Mi \
  --allow-unauthenticated

# 6. Check logs
gcloud run logs read localdeals-api --region us-central1 --limit 50

# 7. Test deployed endpoint
curl https://localdeals-api-xxxxx.run.app/api/v1/health
```

## Viewing Logs

### Cloud Console (GUI)
1. Go to https://console.cloud.google.com/run
2. Click service name `localdeals-api`
3. Click **"Logs"** tab
4. See real-time logs

### Command Line
```bash
# View recent logs
gcloud run logs read localdeals-api --region us-central1 --limit 100

# Stream logs in real-time
gcloud run logs read localdeals-api --region us-central1 --follow

# Filter by error
gcloud run logs read localdeals-api --region us-central1 --filter="severity=ERROR"
```

## Performance Tuning

### Memory & CPU
```bash
gcloud run deploy localdeals-api \
  --memory 512Mi \           # Start with 512Mi, increase if needed
  --cpu 1 \                  # 1 CPU per container
  --concurrency 80 \         # Handle 80 concurrent requests per container
  --max-instances 100 \      # Auto-scale up to 100 instances
  ...
```

### Startup Time
- **Cold Start**: First request after 15 minutes takes longer
- **Warm Start**: Subsequent requests are fast
- **Solution**: Set `--min-instances 1` to keep at least one instance warm

```bash
gcloud run deploy localdeals-api \
  --min-instances 1 \       # Keep 1 instance warm (costs more)
  --max-instances 10 \      # Scale up to 10 if needed
  ...
```

## Cost Optimization

### Free Tier (2 million requests/month)
- Use 512Mi memory
- Set `--max-instances 100`
- Deploy multiple small instances

### Ways to Save
1. Use Cloud Run's built-in scaling
2. Set appropriate memory (512Mi is usually enough)
3. Use background workers for heavy tasks
4. Archive old logs

## Health Check Best Practices

The Dockerfile includes:
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8080/api/v1/health', ...)"
```

This ensures:
- Cloud Run knows when to kill unhealthy instances
- Automatic restart on failure
- Gradual rollout of new versions

## Testing Deployment

### 1. Health Check
```bash
curl https://localdeals-api-xxxxx.run.app/api/v1/health
# Response: {"status":"ok"}
```

### 2. API Endpoints
```bash
# Test auth endpoint
curl -X POST https://localdeals-api-xxxxx.run.app/api/v1/auth/verify-firebase \
  -H "Content-Type: application/json" \
  -d '{"firebaseToken":"test"}'

# Test deals endpoint
curl "https://localdeals-api-xxxxx.run.app/api/v1/deals?lat=40.7128&lng=-74.0060&radius=5"
```

### 3. Error Handling
```bash
# Test 404
curl https://localdeals-api-xxxxx.run.app/api/v1/notfound
# Should return 404, not 500

# Test validation
curl -X POST https://localdeals-api-xxxxx.run.app/api/v1/auth/verify-firebase \
  -H "Content-Type: application/json" \
  -d '{}'  # Missing required field
# Should return 400 validation error
```

## Next Steps

1. ✅ Fix deployment with updated Dockerfile
2. ✅ Set all environment variables in Cloud Run console
3. ✅ Monitor logs for errors
4. ✅ Test all endpoints
5. ✅ Set up monitoring and alerts

---

**Need help?** Run:
```bash
gcloud run logs read localdeals-api --region us-central1 --limit 100
```

And share the logs for debugging.
