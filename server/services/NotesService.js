import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class NotesService {
  async find(query = {}) {
    let data = await dbContext.Notes.find(query).populate(
      "creator",
      "name picture"
    );
    return data;
  }
  async create(noteData) {
    let data = await dbContext.Notes.create(noteData);
    return data;
  }
  async edit(update) {
    let data = await dbContext.Notes.findByIdAndUpdate(update.id, update, {
      new: true,
    });
    return data;
  }
  async delete(id) {
    let data = await dbContext.Notes.findByIdAndDelete(id);
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this note");
    }
  }
}

export const notesService = new NotesService();
