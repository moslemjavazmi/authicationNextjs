export async function GET(req) {
  const cookies = req.cookies.get("session")?.value;

  if (!cookies) {
    return Response.json({ authenticated: false });
  }

  try {
    const session = JSON.parse(cookies);
    return Response.json({
      authenticated: true,
      user: {
        id: session.userId,
        role: session.role
      }
    });
  } catch (error) {
    return Response.json({ authenticated: false });
  }
}
