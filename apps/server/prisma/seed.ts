import { PrismaClient, PartCategory } from "./generated";

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction([
    prisma.bikeConfiguration.deleteMany(),
    prisma.pricingRule.deleteMany(),
    prisma.compatibilityRule.deleteMany(),
    prisma.partOption.deleteMany(),
  ]);

  const partOptionsData = [
    {
      category: PartCategory.FRAME_TYPE,
      value: "full-suspension",
      label: "Full Suspension",
      basePrice: 130,
    },
    {
      category: PartCategory.FRAME_TYPE,
      value: "diamond",
      label: "Diamond",
      basePrice: 100,
    },
    {
      category: PartCategory.FRAME_TYPE,
      value: "step-through",
      label: "Step Through",
      basePrice: 110,
    },
    {
      category: PartCategory.FRAME_FINISH,
      value: "matte",
      label: "Matte",
      basePrice: 20,
    },
    {
      category: PartCategory.FRAME_FINISH,
      value: "shiny",
      label: "Shiny",
      basePrice: 30,
    },
    {
      category: PartCategory.WHEELS,
      value: "road",
      label: "Road Wheels",
      basePrice: 80,
    },
    {
      category: PartCategory.WHEELS,
      value: "mountain",
      label: "Mountain Wheels",
      basePrice: 100,
    },
    {
      category: PartCategory.WHEELS,
      value: "fat-bike",
      label: "Fat Bike Wheels",
      basePrice: 120,
    },
    {
      category: PartCategory.RIM_COLOR,
      value: "red",
      label: "Red",
      basePrice: 15,
    },
    {
      category: PartCategory.RIM_COLOR,
      value: "black",
      label: "Black",
      basePrice: 10,
    },
    {
      category: PartCategory.RIM_COLOR,
      value: "blue",
      label: "Blue",
      basePrice: 20,
    },
    {
      category: PartCategory.CHAIN,
      value: "single-speed",
      label: "Single Speed Chain",
      basePrice: 43,
    },
    {
      category: PartCategory.CHAIN,
      value: "8-speed",
      label: "8-Speed Chain",
      basePrice: 60,
    },
  ];

  const partOptions = await Promise.all(
    partOptionsData.map((data) => prisma.partOption.create({ data })),
  );

  const optionMap = partOptionsData.reduce(
    (map, option, index) => {
      const key = `${option.category}_${option.value}`;
      map[key] = partOptions[index];
      return map;
    },
    {} as Record<string, (typeof partOptions)[0]>,
  );

  const compatibilityRulesData = [
    {
      sourceOptionId: optionMap.WHEELS_mountain.id,
      targetOptionId: optionMap.FRAME_TYPE_diamond.id,
      message:
        "Mountain wheels are only compatible with full-suspension frames",
    },
    {
      sourceOptionId: optionMap.WHEELS_mountain.id,
      targetOptionId: optionMap["FRAME_TYPE_step-through"].id,
      message:
        "Mountain wheels are only compatible with full-suspension frames",
    },
    {
      sourceOptionId: optionMap["WHEELS_fat-bike"].id,
      targetOptionId: optionMap.RIM_COLOR_red.id,
      message: "Fat bike wheels are not available with red rims",
    },
  ];

  await Promise.all(
    compatibilityRulesData.map((data) =>
      prisma.compatibilityRule.create({ data }),
    ),
  );

  const pricingRulesData = [
    {
      partOptionId: optionMap.FRAME_FINISH_matte.id,
      conditions: JSON.stringify([
        { category: "FRAME_TYPE", value: "full-suspension" },
      ]),
      priceAdjustment: 10,
    },
  ];

  await Promise.all(
    pricingRulesData.map((data) => prisma.pricingRule.create({ data })),
  );

  await prisma.bikeConfiguration.create({
    data: {
      name: "Example from Challenge",
      selections: JSON.stringify({
        frameType: "full-suspension",
        frameFinish: "shiny",
        wheels: "road",
        rimColor: "blue",
        chain: "single-speed",
      }),
      totalPrice: 303,
    },
  });

  console.log(
    "Database has been seeded with bike parts and configuration rules!",
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
