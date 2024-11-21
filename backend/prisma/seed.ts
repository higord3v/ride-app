import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const hommer = await prisma.driver.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Homer Simpson',
      description: `Olá! Sou o
        Homer, seu
        motorista
        camarada!
        Relaxe e
        aproveite o
        passeio, com
        direito a
        rosquinhas e
        boas risadas (e
        talvez alguns
        desvios).`,
      car: 'Plymouth Valiant 1973 rosa e enferrujado',
      rating: `2/5 Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.`,
      price: 250,
      minDistance: 1000,
    },
  });
  const jamesBond = await prisma.driver.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'James Bond',
      description: `Boa noite, sou
        James Bond. À
        seu dispor para
        um passeio
        suave e discreto.
        Aperte o cinto e
        aproveite a
        viagem.
        `,
      car: `Aston Martin DB5 clássico`,
      rating: `5/5
        Serviço impecável! O
        motorista é a própria
        definição de classe e o
        carro é simplesmente
        magnífico. Uma
        experiência digna de
        um agente secreto.
        `,
      price: 1000,
      minDistance: 10_000,
    },
  });
  const dominicTorreto = await prisma.driver.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      name: 'Dominic Torreto',
      description: `Ei, aqui é o Dom.
        Pode entrar, vou
        te levar com
        segurança e
        rapidez ao seu
        destino. Só não
        mexa no rádio, a
        playlist é
        sagrada`,
      car: `Dodge
        Charger
        R/T 1970
        modificado`,
      rating: `4/5
        Que viagem incrível! O
        carro é um show à parte
        e o motorista, apesar de
        ter uma cara de poucos
        amigos, foi super gente
        boa. Recomendo!`,
      price: 500,
      minDistance: 5000,
    },
  });
  console.log({ hommer, jamesBond, dominicTorreto });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
