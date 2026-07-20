import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    backgroundColor: "#0A0A0A",
                    backgroundImage:
                        "radial-gradient(circle at 15% 20%, rgba(57,255,20,0.12), transparent 55%)",
                    padding: "96px",
                    fontFamily: "monospace",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        color: "#39FF14",
                        fontSize: 20,
                        letterSpacing: 8,
                        textTransform: "uppercase",
                        marginBottom: 28,
                    }}
                >
                    Développeur Full-Stack
                </div>
                <div
                    style={{
                        display: "flex",
                        color: "#FFFFFF",
                        fontSize: 116,
                        fontWeight: 900,
                        lineHeight: 0.95,
                        textTransform: "uppercase",
                        letterSpacing: -2,
                    }}
                >
                    Hugo Ferreira
                </div>
                <div
                    style={{
                        display: "flex",
                        color: "rgba(255,255,255,0.5)",
                        fontSize: 26,
                        marginTop: 32,
                    }}
                >
                    Développeur passionné par la création d&apos;interfaces web sur-mesure
                </div>
            </div>
        ),
        { ...size }
    );
}
