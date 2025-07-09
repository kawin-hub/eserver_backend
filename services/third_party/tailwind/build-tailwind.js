const fs = require("fs");
const { execSync } = require("child_process");

function build(req, res) {
  const { classes } = req.body;

  if (!Array.isArray(classes)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const css = buildTailwindSafelist(classes);

    res.setHeader("Content-Type", "text/css");
    return res.json(css);
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ error: "CSS generation failed" });
  }
}

function buildTailwindSafelist(classes) {
  const baseConfig = require("./tailwind.config");
  var finalCss = "";

  const tempConfig = {
    ...baseConfig,
    // ใช้ raw content เพื่อให้ Tailwind รู้ว่ามี classes ที่ต้อง generate
    content: [],
    // เพิ่ม safelist เป็น backup (แนะนำให้ใส่ทั้งคู่)
    safelist: classes,
  };

  // เขียน config ใหม่ชั่วคราว
  fs.writeFileSync(
    "./services/third_party/tailwind/tmp/tailwind.temp.config.js",
    `module.exports = ${JSON.stringify(tempConfig, null, 2)}`
  );

  // เขียน input.css (base)
  fs.writeFileSync(
    "./services/third_party/tailwind/tmp/input.css",
    `
  @import "tailwindcss";
      `.trim()
  );

  // สร้าง output.css
  try {
    console.log(`Building CSS for classes`);

    execSync(
      `npx @tailwindcss/cli -c ./services/third_party/tailwind/tmp/tailwind.temp.config.js -i ./services/third_party/tailwind/tmp/input.css -o ./services/third_party/tailwind/tmp/output.css --minify`,
      { stdio: "inherit" }
    );

    // ตรวจสอบว่าไฟล์ถูกสร้างและมีเนื้อหา
    if (fs.existsSync("./services/third_party/tailwind/tmp/output.css")) {
      const outputSize = fs.statSync(
        "./services/third_party/tailwind/tmp/output.css"
      ).size;
      console.log(`✅ CSS generated successfully (${outputSize} bytes)`);
      finalCss = fs.readFileSync(
        "./services/third_party/tailwind/tmp/output.css",
        "utf8"
      );
    } else {
      console.error("❌ output.css was not created");
    }
  } catch (err) {
    console.error("Tailwind build error:", err.message);
    throw err;
  } finally {
    // ลบไฟล์ชั่วคราว
    try {
      fs.unlinkSync(
        "./services/third_party/tailwind/tmp/tailwind.temp.config.js"
      );
      fs.unlinkSync("./services/third_party/tailwind/tmp/input.css");
      fs.unlinkSync("./services/third_party/tailwind/tmp/output.css");
    } catch (cleanupErr) {
      console.warn(
        "Warning: Could not clean up temporary files:",
        cleanupErr.message
      );
    }
  }
  return finalCss;
}

module.exports = { build };
