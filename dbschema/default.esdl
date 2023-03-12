module default {
  type Convention {
    required property start_date -> datetime;
    required property duration -> duration;

    multi link exhibits -> Exhibit;
    multi link sub_events -> SubEvent;
  }

  abstract type Exhibit {
    required property name -> str {
      constraint max_len_value(32);
    };
    required property location -> str {
      constraint max_len_value(64);
    };
    property description -> str {
      constraint max_len_value(1024);
    };

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
    required property name -> str {
      constraint regexp(r'[a-zA-Z\d\s_-]{4,32}');
    };
    required property is_admin -> bool {
      default := false;
    };

    multi link auth -> Authentication;
    link contact -> Contact;
    link company -> Company;
  }

  scalar type Authenticator extending enum<
    'Steam',
    'Discord'
  >;

  type Authentication {
    required property service -> Authenticator;
    required property token -> str;
  }

  type Company {
    required property name -> str {
      constraint max_len_value(32);
    };
    property description -> str {
      constraint max_len_value(1024);
    };

    link leader -> User;
    link contact -> Contact;
    multi link officers -> User;
  }

  scalar type ShipTags extending enum<
    'Asteroid Miner',
    'Moon Miner',
    'Hauler',
    'Salvager',
    'Tanker',
    'Torpedo Boat',
    'Navigation Logger',
    'Long Range',
    'Armored',
    'Fighter',
    'Scooter',
    'Multirole'
  >;

  type Ship {
    required property name -> str {
      constraint max_len_value(32);
    };
    required multi property tags -> ShipTags;
    property mass -> int32 {
      constraint min_value(0);
    };
    property speed -> int32 {
      constraint min_value(0);
      constraint max_value(150);
    };
    property runtime -> duration;
    property range -> int32 {
      constraint min_value(0);
      constraint max_value(1);
    };
    property crates -> int32 {
      constraint min_value(0);
    };
    property energy_generation -> int32 {
      constraint min_value(0);
    };
    property battery -> int32 {
      constraint min_value(0);
    };
    property assembly_cost -> decimal {
      constraint min_value(0);
    };
    property description -> str {
      constraint max_len_value(1024);
    };
    required property for_sale -> bool {
      default := false;
    };

    required multi link owner -> User;
  }

  type CapitalShip {
    required property name -> str {
      constraint max_len_value(32);
    };
    property class -> int32 {
      constraint min_value(1);
      constraint max_value(54);
    };
    property thrusters -> int32 {
      constraint min_value(0);
    };
    property speed -> int32 {
      constraint min_value(7);
      constraint max_len_value(14);
    };
    property description -> str {
      constraint max_len_value(1024);
    };

    required multi link owner -> User;
  }

  type Contact {
    property discord_name -> str {
      constraint regexp(r'^[^\s](?!everyone#|here#)(((?!discord|```|[@#:]).)*)[^\s]#\d{4}');
    };
    property discord_server -> str {
      constraint regexp(r'https://discord.gg/[a-zA-Z\d]+');
    };
    property youtube -> str {
      constraint regexp(r'https://www.youtube.com/@[a-zA-Z\d.-_]{1,60}');
    };
    property twitch -> str {
      constraint regexp(r'https://www.twitch.tv/[a-zA-Z\d_]{4,25}');
    };
    property timezone -> str;
  }

  type SubEvent {
    required property start_date -> datetime;
    required property duration -> duration;
    property description -> str {
      constraint max_len_value(1024);
    };
    required property location -> str {
      constraint max_len_value(64);
    };

    required link owner -> User;
  }
}