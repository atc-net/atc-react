import {
  ISelectableOption,
  SelectableOptionMenuItemType,
} from "@fluentui/react";
import {
  SingleselectOption,
  SingleselectOptionType,
} from "../components/Singleselect/Singleselect.props";

const flowers: string[] = [
  "Acacia",
  "Acanthus",
  "Aloe, Socotrine",
  "Amaranth",
  "American ash",
  "Angelica",
  "Anthericum",
  "Arum",
  "Arum, Fly-catching",
  "Ash-leaved Trumpet-flower",
  "Aspen",
  "Aster, China",
  "Basil",
  "Bellflower",
  "Bellflower, pyramidal",
  "Bindweed, field",
  "Bindweed, purple",
  "Blackthorn",
  "Bladder, senna",
  "Bluebottle",
  "Borage",
  "Bramble",
  "Broom, prickly",
  "Broom, Spanish",
  "Broomrape",
  "Bryony",
  "Buck-bean",
  "Bugloss",
  "Burdock",
  "Cactus",
  "Catch-fly, night-flowering",
  "Celsia, great-flowered",
  "Christmas aconite",
  "Cinquefoil",
  "Clianthus",
  "Clove pink",
  "Columbine",
  "Coltsfoot",
  "Coriander",
  "Crowfoot, meadow",
  "Crowfoot, marsh",
  "Crown Imperial",
  "Dahlia",
  "Daffodil",
  "Daisy, double",
  "Daisy, single",
  "Daisy, wild",
  "Dandelion",
  "Date, plum",
  "Daylily, yellow",
  "Dittany of Crete",
  "Dittany, white",
  "Dock",
  "Dodder",
  "Dragon-plant",
  "Elastic Momordica",
  "Enchanter's Nightshade",
  "Everlasting",
  "Fennel",
  "Fieldrush",
  "Fig Marigold",
  "Foxglove",
  "Geranium, clouded",
  "Geranium, rose",
  "Geranium, scarlet",
  "Gilliflower, Mahon's",
  "Gilliflower, stock",
  "Goat's rue",
  "Goosefoot",
  "Hazel",
  "Hedysarum",
  "Heath",
  "Helenium, smooth",
  "Hepatica",
  "Hibiscus",
  "Hogbean",
  "Hollow-root",
  "Holly",
  "Hollyhock",
  "Honesty",
  "Honeysuckle",
  "Hornbeam",
  "Hortensia",
  "Hyacinth, expanded",
  "Hyacinth, garden",
  "Hyacinth, wild",
  "Hybrid crinum",
];

export const FlowerDataset: SingleselectOption[] = flowers.map((flower) => ({
  text: flower,
}));

export const FlowerDatasetCustomFormat: SingleselectOption[] = flowers.map(
  (flower, index) => ({
    text: flower,
    className: index % 2 === 0 ? "text-center" : "text-center text-blue-900",
  })
);

export const AutoDatasetWithHeading: SingleselectOption[] = [
  {
    text: "A",
    type: SingleselectOptionType.HeadingAutoCount,
  },
  { text: "Abarth" },
  { text: "Acura" },
  { text: "Alfa Romeo" },
  { text: "Aston Martin" },
  { text: "Audi" },
  {
    text: "B",
    type: SingleselectOptionType.HeadingAutoCount,
  },
  { text: "Bentley" },
  { text: "BMW" },
  { text: "Buick" },
  {
    text: "C",
    type: SingleselectOptionType.HeadingAutoCount,
  },
  { text: "Cadillac" },
  { text: "Chevrolet" },
  { text: "Chrystler" },
  { text: "Citroen" },
  {
    text: "L",
    type: SingleselectOptionType.HeadingAutoCount,
  },
  { text: "Lamborghini" },
  { text: "Lancia" },
  { text: "Land Rover" },
  { text: "Lexus" },
  { text: "Lincoln" },
  { text: "Lotus" },
];

export const SelectableFlowerDataset: ISelectableOption[] = flowers.map(
  (flower) => ({
    key: flower,
    text: flower,
  })
);

export const SelectableAutoDatasetWithHeading: ISelectableOption[] =
  AutoDatasetWithHeading.map((set) => {
    if (
      set.type === SingleselectOptionType.HeadingAutoCount ||
      set.type === SingleselectOptionType.Heading
    ) {
      return {
        key: set.text,
        text: set.text,
        itemType: SelectableOptionMenuItemType.Header,
      };
    }
    return {
      key: set.text,
      text: set.text,
    };
  });
