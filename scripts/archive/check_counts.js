const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const total = await prisma.property.count();
  const active = await prisma.property.count({ where: { status: 'active' } });
  
  const props = await prisma.property.findMany({ select: { id: true, status: true } });
  
  console.log('Total:', total, 'Active:', active);
  
  const statuses = {};
  for (const p of props) {
      if (!statuses[p.status]) statuses[p.status] = 0;
      statuses[p.status]++;
  }
  console.log('Statuses:', statuses);
}

main().catch(console.error).finally(()=> prisma.$disconnect());
