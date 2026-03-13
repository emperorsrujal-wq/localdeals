import Foundation
import Combine

class APIClient {
    private let baseURL = "http://localhost:3000/api/v1" // Update for production
    private let session = URLSession.shared
    private let keychainManager = KeychainManager()

    enum APIError: LocalizedError {
        case invalidURL
        case networkError(Error)
        case decodingError(Error)
        case serverError(Int)
        case unauthorized

        var errorDescription: String? {
            switch self {
            case .invalidURL:
                return "Invalid URL"
            case .networkError(let error):
                return "Network error: \(error.localizedDescription)"
            case .decodingError(let error):
                return "Decoding error: \(error.localizedDescription)"
            case .serverError(let code):
                return "Server error: \(code)"
            case .unauthorized:
                return "Unauthorized. Please login again."
            }
        }
    }

    // MARK: - GET Request

    func get<T: Decodable>(_ endpoint: String) -> AnyPublisher<T, APIError> {
        guard let url = URL(string: baseURL + endpoint) else {
            return Fail(error: .invalidURL).eraseToAnyPublisher()
        }

        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        addAuthHeader(&request)

        return session.dataTaskPublisher(for: request)
            .mapError { .networkError($0) }
            .tryMap { data, response in
                guard let httpResponse = response as? HTTPURLResponse else {
                    throw APIError.serverError(0)
                }

                guard 200..<300 ~= httpResponse.statusCode else {
                    if httpResponse.statusCode == 401 {
                        throw APIError.unauthorized
                    }
                    throw APIError.serverError(httpResponse.statusCode)
                }

                return data
            }
            .mapError { $0 as? APIError ?? .networkError($0) }
            .decode(type: T.self, decoder: JSONDecoder())
            .mapError { .decodingError($0) }
            .eraseToAnyPublisher()
    }

    // MARK: - POST Request

    func post<T: Decodable, E: Encodable>(_ endpoint: String, body: E) -> AnyPublisher<T, APIError> {
        guard let url = URL(string: baseURL + endpoint) else {
            return Fail(error: .invalidURL).eraseToAnyPublisher()
        }

        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        addAuthHeader(&request)

        do {
            request.httpBody = try JSONEncoder().encode(body)
        } catch {
            return Fail(error: .decodingError(error)).eraseToAnyPublisher()
        }

        return session.dataTaskPublisher(for: request)
            .mapError { .networkError($0) }
            .tryMap { data, response in
                guard let httpResponse = response as? HTTPURLResponse else {
                    throw APIError.serverError(0)
                }

                guard 200..<300 ~= httpResponse.statusCode else {
                    if httpResponse.statusCode == 401 {
                        throw APIError.unauthorized
                    }
                    throw APIError.serverError(httpResponse.statusCode)
                }

                return data
            }
            .mapError { $0 as? APIError ?? .networkError($0) }
            .decode(type: T.self, decoder: JSONDecoder())
            .mapError { .decodingError($0) }
            .eraseToAnyPublisher()
    }

    // MARK: - PUT Request

    func put<T: Decodable, E: Encodable>(_ endpoint: String, body: E) -> AnyPublisher<T, APIError> {
        guard let url = URL(string: baseURL + endpoint) else {
            return Fail(error: .invalidURL).eraseToAnyPublisher()
        }

        var request = URLRequest(url: url)
        request.httpMethod = "PUT"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        addAuthHeader(&request)

        do {
            request.httpBody = try JSONEncoder().encode(body)
        } catch {
            return Fail(error: .decodingError(error)).eraseToAnyPublisher()
        }

        return session.dataTaskPublisher(for: request)
            .mapError { .networkError($0) }
            .tryMap { data, response in
                guard let httpResponse = response as? HTTPURLResponse else {
                    throw APIError.serverError(0)
                }

                guard 200..<300 ~= httpResponse.statusCode else {
                    throw APIError.serverError(httpResponse.statusCode)
                }

                return data
            }
            .mapError { $0 as? APIError ?? .networkError($0) }
            .decode(type: T.self, decoder: JSONDecoder())
            .mapError { .decodingError($0) }
            .eraseToAnyPublisher()
    }

    // MARK: - DELETE Request

    func delete<T: Decodable>(_ endpoint: String) -> AnyPublisher<T, APIError> {
        guard let url = URL(string: baseURL + endpoint) else {
            return Fail(error: .invalidURL).eraseToAnyPublisher()
        }

        var request = URLRequest(url: url)
        request.httpMethod = "DELETE"
        addAuthHeader(&request)

        return session.dataTaskPublisher(for: request)
            .mapError { .networkError($0) }
            .tryMap { data, response in
                guard let httpResponse = response as? HTTPURLResponse else {
                    throw APIError.serverError(0)
                }

                guard 200..<300 ~= httpResponse.statusCode else {
                    throw APIError.serverError(httpResponse.statusCode)
                }

                return data
            }
            .mapError { $0 as? APIError ?? .networkError($0) }
            .decode(type: T.self, decoder: JSONDecoder())
            .mapError { .decodingError($0) }
            .eraseToAnyPublisher()
    }

    // MARK: - Private Methods

    private func addAuthHeader(_ request: inout URLRequest) {
        if let token = keychainManager.getToken() {
            request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        }
    }
}
