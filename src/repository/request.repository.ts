import { getRepository } from "typeorm";
import { Request } from "../models/request.model";

class RequestRepository {
  async createRequest(request: Partial<Request>) {
    const newRequest = getRepository(Request).create(request);
    return await getRepository(Request).save(newRequest);
  }
}

export default new RequestRepository();
