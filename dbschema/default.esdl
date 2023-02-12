module default {
  type Convention {
    required property start_date -> datetime;
    required property duration -> duration;

    multi link exhibits -> Exhibit;
    multi link sub_events -> SubEvent;
  }

  abstract type Exhibit {
    required property name -> str;
    required property location -> str;

    multi link ships -> Ship;
    multi link capital_ships -> CapitalShip;
  }

  type BrandExhibit extending Exhibit {
    required multi link owners -> User;
  }

  type CompanyExhibit extending Exhibit {
    required link company -> Company;
  }

  type User {
    required property name -> str;
    required property salt -> str;
    required property hash -> str;
    required property is_admin -> bool;

    link contact -> Contact;
    link company -> Company;
  }

  type Company {
    required property name -> str;
    property description -> str;

    link leader -> User;
    link contact -> Contact;
    multi link officers -> User;
  }

  scalar type ShipTags extending enum<
    `Asteroid Miner`,
    `Moon Miner`,
    `Hauler`,
    `Salvager`,
    `Tanker`,
    `Torpedo Boat`,
    `Navigation Logger`,
    `Long Range`,
    `Armored`,
    `Fighter`,
    `Scooter`,
    `Multirole`
  >;

  type Ship {
    required property name -> str;
    required multi property tags -> ShipTags;
    required property mass -> int32;
    required property speed -> int32;
    property range -> int32;
    property runtime -> duration;
    property crates -> int32;
    property energy_generation -> int32;
    property battery -> int32;
    property assembly_cost -> decimal;
    property description -> str;
    property for_sale -> bool;

    required multi link owner -> User;
  }

  type CapitalShip {
    required property name -> str;
    property class -> int32;
    property description -> str;

    required multi link owner -> User;
  }

  type Contact {
    property discord_name -> str;
    property discord_server -> str;
    property youtube -> str;
    property twitch -> str;
    property timezone -> str;
  }

  type SubEvent {
    required property start_date -> datetime;
    required property duration -> duration;
    required property description -> str;
    required property location -> str;

    required link owner -> User;
  }
}