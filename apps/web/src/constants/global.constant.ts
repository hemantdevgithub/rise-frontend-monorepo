export const Categories = [
  "life-skills",
  "entrepreneurship",
  "leadership",
  "empower-training",
] as const;

export const CategoryFilteringOptions = Categories.map((item) => ({
  label: item.split("-").join(" "),
  value: item,
}));

export const SegmentTypes = {
  TIERPRENEUR: "TIERPRENEUR",
  STARTUP: "STARTUP",
  IMPACT: "IMPACT",
  SUPPLY_CHAIN: "SUPPLY_CHAIN",
};
