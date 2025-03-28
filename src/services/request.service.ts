import { Request } from "../models/request.model";
import requestRepository from "../repository/request.repository";

class RequestService {
  async createRequest(request: Partial<Request>) {
    return requestRepository.createRequest(request);
  }
}

export default new RequestService();
