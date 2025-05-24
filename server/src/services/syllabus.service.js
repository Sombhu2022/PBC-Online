import { Syllabus } from "../model/syllabus.model.js";

class SyllabusService {
  async createSyllabus(data, user) {
    const { paperCode, department, semester } = data;

    const syllabus = await Syllabus.create({
      user: user._id || user.id,
      paperCode,
      department,
      semester,
      media: [
        {
          mediaUrl: data.fileUrl || "placeholder-url", // placeholder if you're not using Cloudinary
          mediaID: data.fileId || "placeholder-id",
        },
      ],
    });

    return syllabus;
  }

  async updateSyllabus(data, id) {
    const syllabus = await Syllabus.findByIdAndUpdate(id, data, { new: true });
    return syllabus;
  }

  // async showSyllabus({ department, semester, paperCode }) {
  async showSyllabus(data) {
    // const department = data.department;
    // const semester = data.semester;
    // const paperCode = data.paperCode;
    // const filter = { department };
    // if (semester) filter.semester = semester;
    // if (paperCode) filter.paperCode = paperCode;

    // const syllabus = await Syllabus.find(filter).select("media");
    const syllabus = await Syllabus.find({}).populate("semester" , "name _id")
    // console.log(`syllabus skd=>${syllabus}`);

    return syllabus || null;
  }

  async deleteSyllabus(id) {
    const result = await Syllabus.findByIdAndDelete(id);
    return result;
  }
}
export default new SyllabusService();
