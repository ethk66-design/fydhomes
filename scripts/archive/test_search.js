const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const where = {
    AND: [
      { status: 'active' },
      {
        OR: [
          { location: { contains: 'Aluva', mode: 'insensitive' } },
          { title: { contains: 'Aluva', mode: 'insensitive' } }
        ]
      },
      {
        OR: [
          { type: { equals: 'Villa', mode: 'insensitive' } },
          { title: { contains: 'Villa', mode: 'insensitive' } }
        ]
      }
    ]
  };

  const props = await prisma.property.findMany({
    where,
    select: { id: true, title: true, type: true, location: true }
  });
  
  console.log(`Found ${props.length} results for Type=Villa & Area=Aluva`);
  console.log(JSON.stringify(props, null, 2));
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
