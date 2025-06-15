import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        creator: true,
      },
    });

    const formattedCourses = courses.map((course) => ({
      ...course,
      categories: course.categories.map((cat) => cat.category),
    }));

    return new Response(JSON.stringify(formattedCourses), { status: 200 });
  } catch (error) {
    console.error("GET /api/course error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch courses" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, description, creatorId, categoryIds } = body;

    const course = await prisma.course.create({
      data: {
        title,
        description,
        creatorId,
        categories: {
          create: categoryIds.map((id) => ({
            category: {
              connect: { id },
            },
          })),
        },
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    return new Response(JSON.stringify(course), { status: 201 });
  } catch (error) {
    console.error("POST /api/course error:", error);
    return new Response(JSON.stringify({ error: "Course creation failed" }), {
      status: 500,
    });
  }
}
