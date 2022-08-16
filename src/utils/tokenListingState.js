import Grass from "../assets/images/grass.jpg";
import Road from "../assets/images/road.png";

export const allStates = [
  {
    id: "1",
    type: "Carbon",
    value: "Listable",
  },
  {
    id: "2",
    type: "Carbon offseted ",
    value: "Visible",
  },
];

export const accessablity = {
  Listable: "1",
  Visible: "2",
};

export const badgeUI = (listingState) => {
  switch (listingState) {
    case "1":
      return Road;
    case "2":
      return Grass;

    default:
    // code block
  }
};

export const getTokenListingState = (id) => {
  const filterData = allStates.find((val) => val.id === id);
  return filterData?.type;
};

export const userAllowedActions = ["1", "2"];

// asset those are having img on the map
export const assetHavingImage = ["1", "2"];
