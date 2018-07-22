const visitorSide0A = {
  "team": {
    "id": "7 G",
    "name": "7 G"
  },
  "score": {
    "score": 0
  },
  "seed": {
    "sourceGame": null,
    "rank": 2,
    "displayName": ""
  }
};
const homeSideOA = {
  "team": {
    "id": "6 F",
    "name": "6 F"
  },
  "score": {
    "score": 1
  },
  "seed": {
    "sourceGame": null,
    "rank": 2,
    "displayName": ""
  }
};
const game0A = {
  "id": "B1",
  "name": "Round 0A",
  "sides": {
    "visitor": visitorSide0A,
    "home": homeSideOA
  }
};
const game0B = {
  "id": "B2",
  "name": "Round 0B",
  "sides": {
    "visitor": {
      "team": {
        "id": "8 H",
        "name": "8 H"
      },
      "score": null,
      "seed": {
        "sourceGame": null,
        "rank": 2,
        "displayName": ""
      }
    },
    "home": {
      "team": {
        "id": "5 E",
        "name": "5 E"
      },
      "score": null,
      "seed": {
        "sourceGame": null,
        "rank": 2,
        "displayName": ""
      }
    }
  }
};
const game1A = {
  "id": "B3",
  "name": "Round 1A",
  "sides": {
    "visitor": {
      "team": {
        "id": "6 F",
        "name": "6 F"
      },
      "score": null,
      "seed": {
        "sourceGame": game0A,
        "rank": 1,
        "displayName": ""
      }
    },
    "home": {
      "team": {
        "id": "1 A",
        "name": "1 A"
      },
      "score": null,
      "seed": {
        "sourceGame": null,
        "rank": 1,
        "displayName": ""
      }
    }
  }
};
const game1B = {
  "id": "B4",
  "name": "Round 1B",
  "sides": {
    "visitor": {
      "team": null,
      "score": null,
      "seed": {
        "sourceGame": game0B,
        "rank": 1,
        "displayName": ""
      }
    },
    "home": {
      "team": {
        "id": "2 B",
        "name": "2 B"
      },
      "score": null,
      "seed": {
        "sourceGame": null,
        "rank": 1,
        "displayName": ""
      }
    }
  }
};    

// this is of type Game
const finals = {
  "id": "B5",
  "name": "Round 2",
  "sides": {
    "visitor": {
      "team": null,
      "score": null,
      "seed": {
        "sourceGame": game1B,
        "rank": 1,
        "displayName": ""
      }
    },
    "home": {
      "team": null,
      "score": null,
      "seed": {
        "sourceGame": game1A,
        "rank": 1,
        "displayName": ""
      }
    }
  }
};