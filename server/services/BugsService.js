import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class BugsService {
  async find(query = {}) {
    let data = await dbContext.Bugs.find(query).populate(
      "creator",
      "name picture"
    );
    return data;
  }
  async findById(id) {
    let data = await dbContext.Bugs.findById(id);
    if (!data) {
      throw new BadRequest("Invalid Id");
    }
    return data;
  }
  async create(bugData) {
    let data = await dbContext.Bugs.create(bugData);
    return data;
  }
  async edit(update) {
    let data = await dbContext.Bugs.findByIdAndUpdate(update.id, update, {
      new: true,
    });
    return data;
  }
  async delete(update) {
    let data = await dbContext.Bugs.findByIdAndUpdate(update.id, update, {
      new: true,
    });
    return data;
  }
}

export const bugsService = new BugsService();
