import express from "express";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes FIRST
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    try {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } catch (e) {
      console.warn("Vite not found, falling back to static files.");
      const distPath = path.join(process.cwd(), "dist");
      app.use(express.static(distPath));
      app.get("*all", (_req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    }
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const server = app.listen(PORT, "0.0.0.0");
  server.on("listening", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  server.on("error", (err) => {
    console.error("Server failed to start:", err);
    process.exit(1);
  });
}

startServer();
