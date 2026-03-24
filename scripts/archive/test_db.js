const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const props = await prisma.property.findMany({
    select: { id: true, title: true, type: true, listing_type: true, location: true, area: true }
  });
  console.log(JSON.stringify(props, null, 2));
}
main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
