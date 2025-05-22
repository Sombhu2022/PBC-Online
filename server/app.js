import express from "express"
import bodyParser from "body-parser"

import corsConfig from "./src/config/cors.config.js"
import { syllabusRouter } from "./src/routes/syllabus.routes.js"
import { certificateRouter } from "./src/routes/certificate.routes.js"
import { departmentRouter } from "./src/routes/department.routes.js"
import { semesterRouter } from "./src/routes/semester.routes.js"
import { meetingRouter } from "./src/routes/meeting.routes.js"
import { noticeboardRouter } from "./src/routes/noticeboard.routes.js"
import { cloudinaryConfig } from "./src/config/cloudinary.config.js"
import { userRouter } from "./src/routes/user.routes.js"
import { externalRouter } from "./src/routes/extarnal.routes.js"
import cookieParser from "cookie-parser"

const server = express()

server.use(corsConfig)
cloudinaryConfig()
server.use(bodyParser.json({ limit: "50mb" }))
server.use(express.json({ limit: "50mb" }))
server.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
server.use(cookieParser())
// all routes 

server.use('/api/v1/certificate', certificateRouter)
server.use('/api/v1/syllabus', syllabusRouter)
server.use('/api/v1/department', departmentRouter)
server.use('/api/v1/semester', semesterRouter)
server.use('/api/v1/user', userRouter)
server.use('/api/v1/meeting', meetingRouter)
server.use('/api/v1/noticeboard', noticeboardRouter)
server.use('/api/v1/external' , externalRouter)

server.get("/", (req, res) => {
    res.send("application is run ").json({
        message: "all ok "
    })
})


export default server