import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  const body = await req.json();

  try {
    const category = await prisma.category.create({
      data: {
        name: body.name,
      },
    });
    return new Response(JSON.stringify(category), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Create failed" }), {
      status: 500,
    });
  }
}
