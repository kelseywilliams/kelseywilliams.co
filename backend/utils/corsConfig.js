const whitelist = [
    "https://kelseywilliams.co",
    "http://localhost",
    "http://192.168.0.182",
]

// cb stands for callback, dummy
const corsConfig = {
    origin: (origin, cb) => {
        if (!origin || whitelist.includes(origin)) {
            cb(null, true);
        } else {
            cb(new Error(`Origin blocked by CORS policy: Origin "${origin}" not included in CORS whitelist.`))
        }
    },
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
}

export { whitelist, corsConfig }