const parkingInventory = [
  {
    id: "pr-001",
    name: "Qendra Grand Garage",
    destination: "Prishtine Center",
    type: "garage",
    basePrice: 2.2,
    hourlyMultiplier: 1,
    driveUpPrice: 15,
    distanceKm: 0.2,
    walkMinutes: 3,
    covered: true,
    ev: true,
    valet: false,
    availableSpots: 26,
    capacity: 40,
    address: "Garibaldi Street, Prishtine",
    access: "Scan QR at the gate. Level B2 reserved lane.",
    tags: ["Covered", "EV charging", "Mobile pass"],
    zone: "premium",
    x: 45,
    y: 42,
  },
  {
    id: "pr-002",
    name: "Mother Teresa Valet Hub",
    destination: "Prishtine Center",
    type: "valet",
    basePrice: 3.4,
    hourlyMultiplier: 1.15,
    driveUpPrice: 22,
    distanceKm: 0.1,
    walkMinutes: 1,
    covered: true,
    ev: false,
    valet: true,
    availableSpots: 8,
    capacity: 15,
    address: "Mother Teresa Boulevard, Prishtine",
    access: "Show reservation to valet attendant at Hotel Sirius corner.",
    tags: ["Valet", "Fast entry", "Premium"],
    zone: "premium",
    x: 49,
    y: 36,
  },
  {
    id: "pr-003",
    name: "Arena Event Lot",
    destination: "Fadil Vokrri Stadium",
    type: "event",
    basePrice: 4.1,
    hourlyMultiplier: 0.85,
    driveUpPrice: 28,
    distanceKm: 0.4,
    walkMinutes: 6,
    covered: false,
    ev: false,
    valet: false,
    availableSpots: 52,
    capacity: 80,
    address: "Luan Haradinaj Street, Prishtine",
    access: "Event lane opens 90 minutes before kickoff.",
    tags: ["Event parking", "Large capacity"],
    zone: "premium",
    x: 58,
    y: 31,
  },
  {
    id: "pr-004",
    name: "Ulpiana Smart Lot",
    destination: "Ulpiana District",
    type: "lot",
    basePrice: 1.8,
    hourlyMultiplier: 1,
    driveUpPrice: 13,
    distanceKm: 0.7,
    walkMinutes: 9,
    covered: false,
    ev: true,
    valet: false,
    availableSpots: 33,
    capacity: 54,
    address: "Ulpiana, Prishtine",
    access: "License plate entry with attendant support.",
    tags: ["Budget pick", "EV charging"],
    zone: "standard",
    x: 60,
    y: 58,
  },
  {
    id: "pr-005",
    name: "Dardania Monthly Deck",
    destination: "Bus Station",
    type: "monthly",
    basePrice: 72,
    hourlyMultiplier: 1,
    driveUpPrice: 98,
    distanceKm: 0.5,
    walkMinutes: 7,
    covered: true,
    ev: true,
    valet: false,
    availableSpots: 12,
    capacity: 22,
    address: "Dardania Block, Prishtine",
    access: "Monthly pass lane opens with plate recognition.",
    tags: ["Monthly", "Covered", "Commuter"],
    zone: "standard",
    x: 31,
    y: 56,
  },
  {
    id: "pr-006",
    name: "Bus Station Saver Lot",
    destination: "Bus Station",
    type: "lot",
    basePrice: 1.5,
    hourlyMultiplier: 0.95,
    driveUpPrice: 11,
    distanceKm: 0.3,
    walkMinutes: 4,
    covered: false,
    ev: false,
    valet: false,
    availableSpots: 41,
    capacity: 68,
    address: "Bus Station Ring, Prishtine",
    access: "Budget outdoor lot with staffed entrance.",
    tags: ["Budget pick", "Transit access"],
    zone: "standard",
    x: 24,
    y: 61,
  },
  {
    id: "pr-007",
    name: "Sunny Hill Festival Zone",
    destination: "Sunny Hill Event Zone",
    type: "event",
    basePrice: 5.2,
    hourlyMultiplier: 0.82,
    driveUpPrice: 34,
    distanceKm: 0.6,
    walkMinutes: 8,
    covered: false,
    ev: false,
    valet: false,
    availableSpots: 63,
    capacity: 100,
    address: "Germia Approach Road, Prishtine",
    access: "Festival access lane and digital event pass.",
    tags: ["Event", "Large capacity"],
    zone: "standard",
    x: 77,
    y: 27,
  },
  {
    id: "pr-008",
    name: "City Hall Premium Garage",
    destination: "Prishtine Center",
    type: "garage",
    basePrice: 2.8,
    hourlyMultiplier: 1.05,
    driveUpPrice: 18,
    distanceKm: 0.2,
    walkMinutes: 2,
    covered: true,
    ev: true,
    valet: false,
    availableSpots: 18,
    capacity: 28,
    address: "Agim Ramadani Street, Prishtine",
    access: "Fast access beside municipal offices.",
    tags: ["Covered", "Premium", "Fast access"],
    zone: "premium",
    x: 42,
    y: 34,
  },
];

const STANDARD_PRICING = [
  { upToHours: 0.5, price: 0.5 },
  { upToHours: 1, price: 1 },
  { upToHours: 2, price: 2 },
  { upToHours: 4, price: 5 },
  { upToHours: 6, price: 7 },
  { upToHours: 8, price: 10 },
  { upToHours: 24, price: 15 },
];

const PREMIUM_MULTIPLIER = 1.5;
const APP_SERVICE_FEE = 0.05;
const COMMUTER_PLAN_PRICE = 80;

const state = {
  selectedSpot: null,
  search: null,
  language: localStorage.getItem("gjejvend-language") || "en",
  liveInventory: parkingInventory.map((spot) => ({ ...spot })),
  reservations: loadReservations(),
};

const elements = {
  searchForm: document.querySelector("#searchForm"),
  resultsGrid: document.querySelector("#resultsGrid"),
  resultsTitle: document.querySelector("#resultsTitle"),
  searchInsights: document.querySelector("#searchInsights"),
  sortSelect: document.querySelector("#sortSelect"),
  reservationList: document.querySelector("#reservationList"),
  bookingModal: document.querySelector("#bookingModal"),
  bookingForm: document.querySelector("#bookingForm"),
  bookingSummary: document.querySelector("#bookingSummary"),
  modalTitle: document.querySelector("#modalTitle"),
  closeModal: document.querySelector("#closeModal"),
  cancelBooking: document.querySelector("#cancelBooking"),
  driverName: document.querySelector("#driverName"),
  driverEmail: document.querySelector("#driverEmail"),
  vehiclePlate: document.querySelector("#vehiclePlate"),
  paymentMethod: document.querySelector("#paymentMethod"),
  dateInput: document.querySelector("#dateInput"),
  startTimeInput: document.querySelector("#startTimeInput"),
  mapPins: document.querySelector("#mapPins"),
  selectedSpotCard: document.querySelector("#selectedSpotCard"),
  mapSummary: document.querySelector("#mapSummary"),
  heroOpenSpots: document.querySelector("#heroOpenSpots"),
  heroBestPrice: document.querySelector("#heroBestPrice"),
  dockLiveCount: document.querySelector("#dockLiveCount"),
  languageButtons: Array.from(document.querySelectorAll("[data-lang]")),
};

const translations = {
  en: {
    brand_subtitle: "Prishtina live parking simulator",
    nav_map: "Live Map",
    nav_pricing: "Pricing",
    nav_reservations: "Reservations",
    open_map: "Open map",
    hero_eyebrow: "Ride-hailing style experience for your university project",
    hero_title: "See free parking live on the Prishtina map and reserve it instantly.",
    hero_text:
      "This version turns Gjejvend into a live city simulator for Prishtina. Drivers can watch parking availability change in real time, tap map pins, compare prices, and reserve a spot before arriving.",
    hero_cta_primary: "Try live map",
    hero_cta_secondary: "See pricing and policies",
    hero_point_1: "Live map pins that update every few seconds",
    hero_point_2: "Direct reservation from map or side panel",
    hero_point_3: "Prishtina hotspots: center, stadium, bus station, Ulpiana, and Sunny Hill zones",
    hero_live_now: "Live now in simulator",
    hero_live_text: "Availability refreshes automatically to simulate drivers entering and leaving parking areas.",
    hero_best_label: "Fastest option",
    hero_best_text: "Best current prepaid rate in central Prishtina.",
    hero_coverage: "Prishtina coverage",
    zone_center: "Center",
    zone_qendra: "Qendra",
    zone_stadium: "Stadium",
    zone_bus_station: "Bus Station",
    map_heading_eyebrow: "Live Prishtina Map",
    map_heading_title: "Pick a zone, watch availability move, then reserve your parking.",
    field_destination: "Destination",
    field_date: "Date",
    field_start_time: "Start time",
    field_duration: "Duration",
    field_parking_type: "Parking type",
    filter_ev_only: "EV charging only",
    filter_covered_only: "Covered parking only",
    update_live_map: "Update live map",
    live_refresh: "Live refresh",
    live_refresh_value: "Every 4 seconds",
    live_refresh_text: "Simulator changes free spots to feel like a moving city.",
    city_view: "City View",
    dock_live_title: "Live city pulse",
    dock_live_text: "spots updating now",
    dock_zone_title: "Premium zone",
    dock_zone_value: "1.5x",
    dock_zone_text: "center demand multiplier",
    dock_policy_title: "Quick policy",
    dock_policy_value: "10 min grace + $0.05 app fee",
    dock_policy_text: "15-minute save-spot option and $2 no-show fee included in simulator rules",
    sort_label: "Sort",
    legend_many: "Many free spots",
    legend_limited: "Limited spots",
    legend_full: "Almost full",
    features_eyebrow: "Simulator Features",
    features_title: "What this map-based version demonstrates.",
    feature_1_title: "Live parking map",
    feature_1_text: "Users view available parking as moving pins on a city map instead of only browsing a list.",
    feature_2_title: "Dynamic availability",
    feature_2_text: "Spot counts update automatically, creating the feeling of a live transport-style marketplace.",
    feature_3_title: "Map-first reservations",
    feature_3_text: "Every pin opens detailed pricing, walking distance, entry instructions, and one-tap reservation.",
    feature_4_title: "Presentation-ready demo",
    feature_4_text: "Everything works locally in the browser, so you can present a realistic prototype without a complex backend.",
    pricing_eyebrow: "Pricing & Policies",
    pricing_title: "Default pricing, memberships, and reservation rules.",
    standard_pricing: "Standard Pricing Table",
    table_duration: "Duration",
    table_cost: "Cost",
    price_row_1_time: "0 - 30 Minutes",
    price_row_2_time: "30 Minutes - 1 Hour",
    price_row_3_time: "1 - 2 Hours",
    price_row_4_time: "2 - 4 Hours",
    price_row_5_time: "4 - 6 Hours",
    price_row_6_time: "6 - 8 Hours",
    price_row_7_time: "8 - 24 Hours",
    grace_period_text: "10-minute grace period before jumping to the next pricing tier.",
    service_fee_text: "App service fee: $0.05 added on arrival for standard bookings paid with the app.",
    dynamic_pricing: "Dynamic Pricing Zones",
    dynamic_pricing_title: "Standard and Premium zone multipliers",
    dynamic_pricing_text: "Standard zones use the base table. Premium city-center zones apply an automatic 1.5x multiplier.",
    memberships: "Memberships",
    membership_title: "Working Hours Commuter Plan",
    membership_text: "Price: $80.00. Covers up to 8 hours per day, Monday to Friday, starting exactly at arrival time.",
    policy_early_title: "Early Departure & Spot Saving",
    policy_early_text: "If a driver leaves early, they get 15 minutes to choose “I’m Finished” for time-used billing or “Save My Spot” for a 10% flexibility fee while keeping the space reserved.",
    policy_hold_title: "Pre-Authorization Hold",
    policy_hold_text: "When a booking is made, the app places a hold for the booked total and captures only the final amount based on usage and policy.",
    policy_cancel_title: "Cancellation & No-Show",
    policy_cancel_text: "Drivers can cancel for free within 5 minutes. After that, or for a no-show, a flat $2.00 fee is charged to protect the spot owner.",
    policy_zone_title: "Zone Assignment",
    policy_zone_text: "Managers and the platform can mark spaces as Standard or Premium based on real demand and location intensity.",
    strategy_eyebrow: "Startup Strategy",
    strategy_title: "Executive summary, roadmap, and Kosovo localization.",
    executive_summary: "Executive Summary",
    summary_title: "GjejVend is a map-first parking reservation platform for Prishtina.",
    summary_text:
      "GjejVend connects drivers looking for parking with private individuals or businesses that have available spots. As the platform scales, it can integrate sensors and cameras to digitize, optimize, and monetize public parking spaces.",
    value_drivers_title: "For Drivers",
    value_drivers_text:
      "Guaranteed parking exactly when and where needed, removing the stress and traffic caused by circling for a spot.",
    value_owners_title: "For Spot Owners",
    value_owners_text:
      "Monetize unused driveways, private lots, and office parking spaces after working hours.",
    value_city_title: "For the City",
    value_city_text:
      "Reduce congestion, lower emissions, and improve public space usage through real-time parking analytics.",
    phase_1_label: "Phase 1",
    phase_1_title: "MVP: Private Parking Network",
    phase_1_point_1: "Search and filter by location, date, time, vehicle size, and price.",
    phase_1_point_2: "Booking requests or instant booking based on manager preference.",
    phase_1_point_3: "Navigation, geofencing, automated check-in/check-out, and digital payments.",
    phase_1_point_4: "Spot manager portal with listing photos, schedules, pricing, requests, and revenue metrics.",
    phase_2_label: "Phase 2",
    phase_2_title: "Scaling: Smart Public Parking",
    phase_2_point_1: "IoT parking sensors detect whether public spots are occupied in real time.",
    phase_2_point_2: "ANPR cameras track vehicle entry and exit using number plate recognition.",
    phase_2_point_3: "Drive-through billing charges users automatically for the exact minutes used.",
    rec_1_title: "Inventory Management Algorithm",
    rec_1_text:
      "Prevent overlap automatically with 15-minute buffers before and after each booking instead of relying on managers to edit requests manually.",
    rec_2_title: "Geofencing for privacy",
    rec_2_text:
      "Use low-power location logic that becomes active only near the parking spot, then combine it with a manual arrival confirmation if GPS accuracy drops.",
    rec_3_title: "Grace periods and overstay rules",
    rec_3_text:
      "Add clear buffer zones and premium overstay penalties to protect drivers, owners, and booking reliability.",
    rec_4_title: "Localization for Kosovo",
    rec_4_text:
      "Support local bank APIs, precise pin-drop driveway mapping, and Prishtina-specific navigation accuracy for narrow streets and alleys.",
    saved_bookings: "Saved Bookings",
    reservations_title: "Your simulated reservations.",
    reservations_text:
      "Reservations are saved in your browser so you can present booking history, digital access, and navigation to the selected parking spot.",
    complete_reservation: "Complete reservation",
    driver_name: "Driver name",
    driver_name_placeholder: "Your full name",
    vehicle_plate: "Vehicle plate",
    payment_method: "Payment method",
    cancel: "Cancel",
    confirm_reservation: "Confirm reservation",
    no_match: "No match",
    adjust_filters: "Adjust filters",
    try_different_zone: "Try a different zone or parking type.",
    best_live_match: "Best live match",
    min_closest_option: "min closest option",
    no_active_parking: "No active parking in this filter.",
    reveal_more_options: "Change the map controls to reveal more parking options.",
    selected_on_map: "Selected on map",
    save_percent: "Save",
    free_spots: "free spots",
    min_walk: "min walk",
    reserve_this_spot: "Reserve this spot",
    navigate: "Navigate",
    no_parking_available: "No parking available.",
    change_destination_filters: "Change destination or filters.",
    live_parking_near: "Live parking near",
    active_locations: "active locations",
    reserve_title: "Reserve",
    reservation_summary: "Reservation summary",
    monthly_plan: "Monthly plan",
    hours: "hours",
    prepaid_online: "prepaid online",
    base_fee_line: "Base {base} + fee {fee} • {zone}",
    zone_premium: "Premium 1.5x zone",
    zone_standard: "Standard zone",
    free_spots_live_now: "free spots live right now",
    entry_instructions: "Entry instructions",
    no_reservations_yet: "No reservations yet.",
    reserve_map_pin: "Reserve a live map pin and it will appear here.",
    plate_label: "Plate",
    entry: "Entry",
    many_spots_free: "Many spots free",
    limited_spots: "Limited spots",
    almost_full: "Almost full",
    destination_prishtine_center: "Prishtine Center",
    destination_fadil_vokrri_stadium: "Fadil Vokrri Stadium",
    destination_sunny_hill_event_zone: "Sunny Hill Event Zone",
    destination_bus_station: "Bus Station",
    destination_ulpiana_district: "Ulpiana District",
    parking_type_all: "All types",
    parking_type_garage: "Garage",
    parking_type_lot: "Lot",
    parking_type_valet: "Valet",
    parking_type_event: "Event",
    parking_type_monthly: "Monthly",
    duration_1: "1 hour",
    duration_2: "2 hours",
    duration_4: "4 hours",
    duration_8: "8 hours",
    duration_12: "12 hours",
    duration_24: "24 hours",
    duration_720: "Monthly",
    sort_recommended: "Recommended",
    sort_price: "Lowest price",
    sort_distance: "Closest",
    sort_savings: "Highest savings",
    tag_Covered: "Covered",
    tag_EV_charging: "EV charging",
    tag_Mobile_pass: "Mobile pass",
    tag_Valet: "Valet",
    tag_Fast_entry: "Fast entry",
    tag_Premium: "Premium",
    tag_Event_parking: "Event parking",
    tag_Large_capacity: "Large capacity",
    tag_Budget_pick: "Budget pick",
    tag_Monthly: "Monthly",
    tag_Commuter: "Commuter",
    tag_Transit_access: "Transit access",
    tag_Event: "Event",
    tag_Fast_access: "Fast access",
  },
  sq: {
    brand_subtitle: "simulatori i parkimit live në Prishtinë",
    nav_map: "Harta Live",
    nav_pricing: "Çmimet",
    nav_reservations: "Rezervimet",
    open_map: "Hape hartën",
    hero_eyebrow: "Përvojë në stil ride-hailing për projektin tënd universitar",
    hero_title: "Shih parkimin e lirë live në hartën e Prishtinës dhe rezervo menjëherë.",
    hero_text:
      "Ky version e kthen Gjejvend në një simulator live të qytetit për Prishtinën. Shoferët mund të shohin ndryshimin e parkimit në kohë reale, të prekin pinat në hartë, të krahasojnë çmimet dhe të rezervojnë një vend para se të arrijnë.",
    hero_cta_primary: "Provo hartën live",
    hero_cta_secondary: "Shih çmimet dhe politikat",
    hero_point_1: "Pina live në hartë që përditësohen çdo disa sekonda",
    hero_point_2: "Rezervim direkt nga harta ose paneli anësor",
    hero_point_3: "Pikat kryesore të Prishtinës: qendra, stadiumi, stacioni i autobusëve, Ulpiana dhe zona Sunny Hill",
    hero_live_now: "Live tani në simulator",
    hero_live_text: "Disponueshmëria rifreskohet automatikisht për të simuluar shoferët që hyjnë dhe dalin nga parkimet.",
    hero_best_label: "Opsioni më i shpejtë",
    hero_best_text: "Çmimi më i mirë aktual me parapagim në qendër të Prishtinës.",
    hero_coverage: "Mbulimi në Prishtinë",
    zone_center: "Qendra",
    zone_qendra: "Qendra",
    zone_stadium: "Stadiumi",
    zone_bus_station: "Stacioni i autobusëve",
    map_heading_eyebrow: "Harta Live e Prishtinës",
    map_heading_title: "Zgjidh një zonë, shiko lëvizjen e vendeve të lira dhe pastaj rezervo parkimin.",
    field_destination: "Destinacioni",
    field_date: "Data",
    field_start_time: "Ora e fillimit",
    field_duration: "Kohëzgjatja",
    field_parking_type: "Lloji i parkimit",
    filter_ev_only: "Vetëm me mbushje EV",
    filter_covered_only: "Vetëm parkim i mbuluar",
    update_live_map: "Përditëso hartën live",
    live_refresh: "Rifreskim live",
    live_refresh_value: "Çdo 4 sekonda",
    live_refresh_text: "Simulatori ndryshon vendet e lira për ta bërë qytetin më realist.",
    city_view: "Pamja e qytetit",
    dock_live_title: "Pulsi live i qytetit",
    dock_live_text: "vende po përditësohen tani",
    dock_zone_title: "Zona premium",
    dock_zone_value: "1.5x",
    dock_zone_text: "shumëzues i kërkesës në qendër",
    dock_policy_title: "Politika e shpejtë",
    dock_policy_value: "10 min tolerancë + $0.05 tarifë app",
    dock_policy_text: "Opsion 15-minutësh për ruajtje vendi dhe tarifë $2 për mosparaqitje në rregullat e simulatorit",
    sort_label: "Rendit",
    legend_many: "Shumë vende të lira",
    legend_limited: "Pak vende të lira",
    legend_full: "Pothuajse plot",
    features_eyebrow: "Veçoritë e simulatorit",
    features_title: "Çfarë demonstron ky version me hartë.",
    feature_1_title: "Hartë live e parkimit",
    feature_1_text: "Përdoruesit e shohin parkimin si pina në hartën e qytetit në vend të një liste të zakonshme.",
    feature_2_title: "Disponueshmëri dinamike",
    feature_2_text: "Numri i vendeve ndryshon automatikisht për të krijuar ndjesinë e një platforme reale transporti.",
    feature_3_title: "Rezervim nga harta",
    feature_3_text: "Çdo pin hap çmimin, distancën në këmbë, udhëzimet e hyrjes dhe rezervimin me një klik.",
    feature_4_title: "Demo gati për prezantim",
    feature_4_text: "Gjithçka funksionon lokalisht në shfletues, kështu që mund të prezantosh një prototip realist pa backend kompleks.",
    pricing_eyebrow: "Çmimet dhe Politikat",
    pricing_title: "Çmimi bazë, membership-et dhe rregullat e rezervimit.",
    standard_pricing: "Tabela Standarde e Çmimeve",
    table_duration: "Kohëzgjatja",
    table_cost: "Kosto",
    price_row_1_time: "0 - 30 Minuta",
    price_row_2_time: "30 Minuta - 1 Orë",
    price_row_3_time: "1 - 2 Orë",
    price_row_4_time: "2 - 4 Orë",
    price_row_5_time: "4 - 6 Orë",
    price_row_6_time: "6 - 8 Orë",
    price_row_7_time: "8 - 24 Orë",
    grace_period_text: "Periudhë tolerance prej 10 minutash para kalimit në tier-in tjetër të çmimit.",
    service_fee_text: "Tarifa e aplikacionit: $0.05 shtohet në mbërritje për rezervimet standarde të paguara në aplikacion.",
    dynamic_pricing: "Zonat e Çmimeve Dinamike",
    dynamic_pricing_title: "Shumëzues standard dhe premium sipas zonës",
    dynamic_pricing_text: "Zonat standarde përdorin tabelën bazë. Zonat premium në qendër aplikojnë automatikisht shumëzuesin 1.5x.",
    memberships: "Membership-e",
    membership_title: "Plani Komuter i Orarit të Punës",
    membership_text: "Çmimi: $80.00. Mbulohet deri në 8 orë në ditë, nga e hëna në të premte, duke filluar saktësisht në momentin e mbërritjes.",
    policy_early_title: "Dalja e Hershme dhe Ruajtja e Vendit",
    policy_early_text: "Nëse shoferi largohet më herët, ai ka 15 minuta për të zgjedhur “Kam përfunduar” për pagesë sipas kohës së përdorur ose “Ruaje vendin tim” me tarifë fleksibiliteti 10%.",
    policy_hold_title: "Mbajtja me Paraautorizim",
    policy_hold_text: "Kur bëhet rezervimi, aplikacioni vendos një hold për totalin e rezervuar dhe kap vetëm shumën finale sipas përdorimit dhe politikës.",
    policy_cancel_title: "Anulimi dhe Mosparaqitja",
    policy_cancel_text: "Shoferët mund të anulojnë falas brenda 5 minutash. Pas kësaj, ose në rast mosparaqitjeje, ngarkohet tarifë fikse $2.00 për të mbrojtur pronarin e vendit.",
    policy_zone_title: "Caktimi i Zonës",
    policy_zone_text: "Menaxherët dhe platforma mund të shënojnë vendet si Standard ose Premium sipas kërkesës reale dhe intensitetit të lokacionit.",
    strategy_eyebrow: "Strategjia e startup-it",
    strategy_title: "Përmbledhja ekzekutive, roadmap-i dhe lokalizimi për Kosovë.",
    executive_summary: "Përmbledhje Ekzekutive",
    summary_title: "GjejVend është një platformë me hartë për rezervim parkimi në Prishtinë.",
    summary_text:
      "GjejVend lidh shoferët që kërkojnë parkim me individë privatë ose biznese që kanë vende të lira. Me rritjen e platformës, ajo mund të integrojë sensorë dhe kamera për të digjitalizuar, optimizuar dhe monetizuar hapësirat publike të parkimit.",
    value_drivers_title: "Për Shoferët",
    value_drivers_text:
      "Parkim i garantuar saktësisht kur dhe ku nevojitet, duke hequr stresin dhe trafikun nga rrotullimi në kërkim të një vendi.",
    value_owners_title: "Për Pronarët e Vendeve",
    value_owners_text:
      "Monetizim i oborreve, parkingjeve private dhe vendeve të zyrave që nuk përdoren pas orarit të punës.",
    value_city_title: "Për Qytetin",
    value_city_text:
      "Ulja e trafikut, emetimeve dhe përmirësimi i përdorimit të hapësirës publike përmes analizave në kohë reale.",
    phase_1_label: "Faza 1",
    phase_1_title: "MVP: Rrjeti Privat i Parkimit",
    phase_1_point_1: "Kërkim dhe filtrim sipas lokacionit, datës, kohës, madhësisë së veturës dhe çmimit.",
    phase_1_point_2: "Kërkesë për rezervim ose rezervim i menjëhershëm sipas preferencës së menaxherit.",
    phase_1_point_3: "Navigim, geofencing, check-in/check-out automatik dhe pagesa digjitale.",
    phase_1_point_4: "Portal i menaxherit me foto, orare, çmime, kërkesa dhe metrika të të ardhurave.",
    phase_2_label: "Faza 2",
    phase_2_title: "Shkallëzimi: Parkim Publik i Mençur",
    phase_2_point_1: "Sensorët IoT zbulojnë në kohë reale nëse vendet publike janë të zëna.",
    phase_2_point_2: "Kamerat ANPR gjurmojnë hyrjen dhe daljen e automjeteve me njohje të targave.",
    phase_2_point_3: "Pagesa automatike i tarifon përdoruesit saktësisht për minutat e përdorura.",
    rec_1_title: "Algoritmi i Menaxhimit të Inventarit",
    rec_1_text:
      "Parandalo mbivendosjen automatikisht me buffer 15-minutësh para dhe pas çdo rezervimi, në vend që menaxherët t’i redaktojnë kërkesat manualisht.",
    rec_2_title: "Geofencing për privatësi",
    rec_2_text:
      "Përdor logjikë me konsum të ulët të lokacionit që aktivizohet vetëm afër parkingut, pastaj kombinoje me konfirmim manual të mbërritjes kur GPS bie në saktësi.",
    rec_3_title: "Periudha tolerance dhe rregulla për tejkalim",
    rec_3_text:
      "Shto buffer të qartë dhe tarifa premium për qëndrim më të gjatë për të mbrojtur shoferët, pronarët dhe besueshmërinë e rezervimeve.",
    rec_4_title: "Lokalizimi për Kosovë",
    rec_4_text:
      "Mbështet API-të e bankave lokale, pin-drop të saktë për hyrjet private dhe navigim të saktë për rrugët dhe rrugicat e Prishtinës.",
    saved_bookings: "Rezervimet e ruajtura",
    reservations_title: "Rezervimet e tua të simuluara.",
    reservations_text:
      "Rezervimet ruhen në shfletuesin tënd që të mund të prezantosh historikun e rezervimeve, qasjen digjitale dhe navigimin drejt vendit të zgjedhur.",
    complete_reservation: "Përfundo rezervimin",
    driver_name: "Emri i shoferit",
    driver_name_placeholder: "Emri dhe mbiemri",
    vehicle_plate: "Targa e veturës",
    payment_method: "Mënyra e pagesës",
    cancel: "Anulo",
    confirm_reservation: "Konfirmo rezervimin",
    no_match: "Nuk u gjet",
    adjust_filters: "Ndrysho filtrat",
    try_different_zone: "Provo një zonë tjetër ose një lloj tjetër parkimi.",
    best_live_match: "Opsioni më i mirë live",
    min_closest_option: "min opsioni më i afërt",
    no_active_parking: "Nuk ka parkim aktiv për këtë filtër.",
    reveal_more_options: "Ndrysho kontrollet e hartës për të parë më shumë opsione.",
    selected_on_map: "I zgjedhur në hartë",
    save_percent: "Kurse",
    free_spots: "vende të lira",
    min_walk: "min në këmbë",
    reserve_this_spot: "Rezervo këtë vend",
    navigate: "Navigo",
    no_parking_available: "Nuk ka parkim në dispozicion.",
    change_destination_filters: "Ndrysho destinacionin ose filtrat.",
    live_parking_near: "Parkim live afër",
    active_locations: "lokacione aktive",
    reserve_title: "Rezervo",
    reservation_summary: "Përmbledhja e rezervimit",
    monthly_plan: "Plan mujor",
    hours: "orë",
    prepaid_online: "me parapagim online",
    base_fee_line: "Bazë {base} + tarifë {fee} • {zone}",
    zone_premium: "Zonë premium 1.5x",
    zone_standard: "Zonë standarde",
    free_spots_live_now: "vende të lira tani live",
    entry_instructions: "Udhëzimet e hyrjes",
    no_reservations_yet: "Ende nuk ka rezervime.",
    reserve_map_pin: "Rezervo një pin në hartë dhe ai do të shfaqet këtu.",
    plate_label: "Targa",
    entry: "Hyrja",
    many_spots_free: "Shumë vende të lira",
    limited_spots: "Pak vende të lira",
    almost_full: "Pothuajse plot",
    destination_prishtine_center: "Qendra e Prishtinës",
    destination_fadil_vokrri_stadium: "Stadiumi Fadil Vokrri",
    destination_sunny_hill_event_zone: "Zona e eventit Sunny Hill",
    destination_bus_station: "Stacioni i autobusëve",
    destination_ulpiana_district: "Lagjja Ulpiana",
    parking_type_all: "Të gjitha llojet",
    parking_type_garage: "Garazh",
    parking_type_lot: "Parking i hapur",
    parking_type_valet: "Valet",
    parking_type_event: "Event",
    parking_type_monthly: "Mujor",
    duration_1: "1 orë",
    duration_2: "2 orë",
    duration_4: "4 orë",
    duration_8: "8 orë",
    duration_12: "12 orë",
    duration_24: "24 orë",
    duration_720: "Mujor",
    sort_recommended: "I rekomanduar",
    sort_price: "Çmimi më i ulët",
    sort_distance: "Më i afërti",
    sort_savings: "Kursimi më i madh",
    tag_Covered: "I mbuluar",
    tag_EV_charging: "Mbushje EV",
    tag_Mobile_pass: "Qasje mobile",
    tag_Valet: "Valet",
    tag_Fast_entry: "Hyrje e shpejtë",
    tag_Premium: "Premium",
    tag_Event_parking: "Parkim për event",
    tag_Large_capacity: "Kapacitet i madh",
    tag_Budget_pick: "Opsion ekonomik",
    tag_Monthly: "Mujor",
    tag_Commuter: "Për udhëtarë",
    tag_Transit_access: "Qasje në transit",
    tag_Event: "Event",
    tag_Fast_access: "Qasje e shpejtë",
  },
};

function t(key) {
  return translations[state.language]?.[key] || translations.en[key] || key;
}

function interpolate(key, values) {
  return Object.entries(values).reduce((text, [name, value]) => text.replace(`{${name}}`, value), t(key));
}

function formatTagKey(tag) {
  return `tag_${tag.replace(/[^A-Za-z0-9]+/g, "_")}`;
}

function localizeTag(tag) {
  return t(formatTagKey(tag));
}

function localizeDestination(value) {
  return t(`destination_${value.replace(/[^A-Za-z0-9]+/g, "_").toLowerCase()}`);
}

function localizeType(value) {
  return t(`parking_type_${value}`);
}

function applyStaticTranslations() {
  document.documentElement.lang = state.language === "sq" ? "sq" : "en";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  elements.languageButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === state.language);
  });
  localizeSelectOptions();
}

function localizeSelectOptions() {
  const destinationMap = {
    "Prishtine Center": "destination_prishtine_center",
    "Fadil Vokrri Stadium": "destination_fadil_vokrri_stadium",
    "Sunny Hill Event Zone": "destination_sunny_hill_event_zone",
    "Bus Station": "destination_bus_station",
    "Ulpiana District": "destination_ulpiana_district",
  };
  const durationMap = {
    1: "duration_1",
    2: "duration_2",
    4: "duration_4",
    8: "duration_8",
    12: "duration_12",
    24: "duration_24",
    720: "duration_720",
  };
  const sortMap = {
    recommended: "sort_recommended",
    price: "sort_price",
    distance: "sort_distance",
    savings: "sort_savings",
  };

  Array.from(document.querySelector("#destination").options).forEach((option) => {
    option.textContent = t(destinationMap[option.value]);
  });
  Array.from(document.querySelector("#duration").options).forEach((option) => {
    option.textContent = t(durationMap[option.value]);
  });
  Array.from(document.querySelector("#parkingType").options).forEach((option) => {
    option.textContent = t(`parking_type_${option.value}`);
  });
  Array.from(document.querySelector("#sortSelect").options).forEach((option) => {
    option.textContent = t(sortMap[option.value]);
  });
}

function loadReservations() {
  try {
    return JSON.parse(localStorage.getItem("gjejvend-reservations") || "[]");
  } catch {
    return [];
  }
}

function saveReservations() {
  localStorage.setItem("gjejvend-reservations", JSON.stringify(state.reservations));
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 50 ? 0 : 2,
  }).format(value);
}

function formatDate(dateString) {
  return new Date(`${dateString}T12:00:00`).toLocaleDateString(state.language === "sq" ? "sq-AL" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function createDefaultDate() {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  return today.toISOString().slice(0, 10);
}

function calculatePrice(spot, duration) {
  if (spot.type === "monthly" || duration >= 720) {
    return COMMUTER_PLAN_PRICE;
  }
  const tier = STANDARD_PRICING.find((item) => duration <= item.upToHours) || STANDARD_PRICING[STANDARD_PRICING.length - 1];
  const multiplier = spot.zone === "premium" ? PREMIUM_MULTIPLIER : 1;
  return Math.round(tier.price * multiplier * 100) / 100;
}

function getAvailabilityTone(spot) {
  const ratio = spot.availableSpots / spot.capacity;
  if (ratio > 0.4) {
    return "high";
  }
  if (ratio > 0.18) {
    return "medium";
  }
  return "low";
}

function buildResult(spot, query) {
  const duration = Number(query.duration);
  const price = calculatePrice(spot, duration);
  const serviceFee = spot.type === "monthly" || duration >= 720 ? 0 : APP_SERVICE_FEE;
  const totalPrice = Math.round((price + serviceFee) * 100) / 100;
  const savings = Math.max(0, Math.round(((spot.driveUpPrice - price) / spot.driveUpPrice) * 100));
  const tone = getAvailabilityTone(spot);
  const availabilityLabel = tone === "high" ? t("many_spots_free") : tone === "medium" ? t("limited_spots") : t("almost_full");
  const recommendedScore =
    (savings * 1.7) +
    ((query.parkingType === "all" || query.parkingType === spot.type) ? 18 : 0) +
    (spot.covered && query.coveredOnly ? 15 : 0) +
    (spot.ev && query.evOnly ? 15 : 0) -
    (spot.distanceKm * 10) +
    (spot.availableSpots / 2);

  return { ...spot, duration, price, serviceFee, totalPrice, savings, tone, availabilityLabel, recommendedScore };
}

function currentSearchFormValues() {
  return {
    destination: document.querySelector("#destination").value,
    date: elements.dateInput.value,
    startTime: elements.startTimeInput.value,
    duration: Number(document.querySelector("#duration").value),
    parkingType: document.querySelector("#parkingType").value,
    evOnly: document.querySelector("#evOnly").checked,
    coveredOnly: document.querySelector("#coveredOnly").checked,
  };
}

function getFilteredResults(query) {
  return state.liveInventory
    .filter((spot) => spot.destination === query.destination || query.destination === "Prishtine Center" && spot.destination === "Prishtine Center")
    .filter((spot) => query.parkingType === "all" || spot.type === query.parkingType)
    .filter((spot) => !query.evOnly || spot.ev)
    .filter((spot) => !query.coveredOnly || spot.covered)
    .map((spot) => buildResult(spot, query));
}

function sortResults(results, sortBy) {
  const sorted = [...results];
  if (sortBy === "price") {
    sorted.sort((a, b) => a.totalPrice - b.totalPrice);
  } else if (sortBy === "distance") {
    sorted.sort((a, b) => a.distanceKm - b.distanceKm);
  } else if (sortBy === "savings") {
    sorted.sort((a, b) => b.savings - a.savings);
  } else {
    sorted.sort((a, b) => b.recommendedScore - a.recommendedScore);
  }
  return sorted;
}

function getMapLink(spot) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${spot.name}, ${spot.address}`)}`;
}

function renderInsights(results, query) {
  if (!elements.searchInsights) {
    return;
  }
  if (!results.length) {
    elements.searchInsights.innerHTML = `<span>${t("no_match")}</span><strong>${t("adjust_filters")}</strong><p>${t("try_different_zone")}</p>`;
    return;
  }

  const cheapest = results.reduce((best, current) => (current.totalPrice < best.totalPrice ? current : best), results[0]);
  const fastest = results.reduce((best, current) => (current.walkMinutes < best.walkMinutes ? current : best), results[0]);

  elements.searchInsights.innerHTML = `
    <span>${t("best_live_match")}</span>
    <strong>${cheapest.name}</strong>
    <p>${formatDate(query.date)} • ${query.startTime} • ${formatCurrency(cheapest.totalPrice)} • ${fastest.walkMinutes} ${t("min_closest_option")}</p>
  `;
}

function renderMapPins(results) {
  if (!elements.mapPins) {
    return;
  }

  elements.mapPins.innerHTML = results
    .map((spot) => {
      const active = state.selectedSpot?.id === spot.id ? "is-active" : "";
      return `
        <button
          class="map-pin tone-${spot.tone} ${active}"
          type="button"
          data-id="${spot.id}"
          style="left:${spot.x}%; top:${spot.y}%"
          aria-label="${spot.name}"
        >
          <span class="pin-pulse"></span>
          <span class="pin-core">${spot.availableSpots}</span>
        </button>
      `;
    })
    .join("");
}

function renderSelectedSpotCard(results) {
  if (!elements.selectedSpotCard) {
    return;
  }

  const selected = results.find((spot) => spot.id === state.selectedSpot?.id) || results[0];
  state.selectedSpot = selected || null;

  if (!selected) {
    elements.selectedSpotCard.innerHTML = `
      <div class="empty-state">
        <h3>${t("no_active_parking")}</h3>
        <p>${t("reveal_more_options")}</p>
      </div>
    `;
    return;
  }

  elements.selectedSpotCard.innerHTML = `
    <p class="mini-label">${t("selected_on_map")}</p>
    <h3>${selected.name}</h3>
    <p>${selected.address}</p>
    <div class="tag-row">
      ${selected.tags.map((tag) => `<span class="tag">${localizeTag(tag)}</span>`).join("")}
      <span class="pill savings">${t("save_percent")} ${selected.savings}%</span>
    </div>
    <div class="result-meta">
      <span>${selected.availableSpots} ${t("free_spots")}</span>
      <span>${selected.walkMinutes} ${t("min_walk")}</span>
      <span>${selected.availabilityLabel}</span>
    </div>
    <div class="selected-price">${formatCurrency(selected.totalPrice)}</div>
    <p>${interpolate("base_fee_line", {
      base: formatCurrency(selected.price),
      fee: formatCurrency(selected.serviceFee),
      zone: t(selected.zone === "premium" ? "zone_premium" : "zone_standard"),
    })}</p>
    <p>${selected.access}</p>
    <div class="result-actions">
      <button class="button button-primary reserve-button" data-id="${selected.id}" type="button">${t("reserve_this_spot")}</button>
      <a class="button button-secondary" href="${getMapLink(selected)}" target="_blank" rel="noreferrer">${t("navigate")}</a>
    </div>
  `;
}

function renderResultsList(results) {
  if (!elements.resultsGrid) {
    return;
  }

  if (!results.length) {
    elements.resultsGrid.innerHTML = `
      <div class="empty-state">
        <h3>${t("no_parking_available")}</h3>
        <p>${t("change_destination_filters")}</p>
      </div>
    `;
    return;
  }

  elements.resultsGrid.innerHTML = results
    .map(
      (spot) => `
        <article class="result-card compact ${state.selectedSpot?.id === spot.id ? "is-selected" : ""}" data-card-id="${spot.id}">
          <div class="result-head">
            <div>
              <p class="mini-label">${localizeType(spot.type)} • ${localizeDestination(spot.destination)}</p>
              <h4>${spot.name}</h4>
            </div>
            <div class="price-block">
              <strong>${formatCurrency(spot.totalPrice)}</strong>
              <span>${spot.availableSpots} ${t("free_spots")}</span>
            </div>
          </div>
          <div class="result-meta">
            <span>${spot.walkMinutes} ${t("min_walk")}</span>
            <span>${spot.availabilityLabel}</span>
          </div>
        </article>
      `
    )
    .join("");
}

function updateHeroStats() {
  if (!elements.heroOpenSpots || !elements.heroBestPrice) {
    return;
  }
  const totalSpots = state.liveInventory.reduce((sum, spot) => sum + spot.availableSpots, 0);
  const cheapest = state.liveInventory.reduce(
    (best, current) => (calculatePrice(current, 2) < calculatePrice(best, 2) ? current : best),
    state.liveInventory[0]
  );
  elements.heroOpenSpots.textContent = `${totalSpots} ${t("free_spots")}`;
  elements.heroBestPrice.textContent = formatCurrency(calculatePrice(cheapest, 2));
  if (elements.dockLiveCount) {
    elements.dockLiveCount.textContent = totalSpots;
  }
}

function renderAll() {
  if (!state.search) {
    return;
  }
  const results = sortResults(getFilteredResults(state.search), elements.sortSelect.value);
  elements.resultsTitle.textContent = `${t("live_parking_near")} ${localizeDestination(state.search.destination)}`;
  elements.mapSummary.textContent = `${results.length} ${t("active_locations")}`;
  renderInsights(results, state.search);
  renderMapPins(results);
  renderSelectedSpotCard(results);
  renderResultsList(results);
  renderReservations();
  updateHeroStats();
}

function openBookingModal(spotId) {
  const results = sortResults(getFilteredResults(state.search), elements.sortSelect.value);
  const spot = results.find((item) => item.id === spotId);
  if (!spot || !elements.bookingModal) {
    return;
  }

  state.selectedSpot = spot;
  elements.modalTitle.textContent = `${t("reserve_title")} ${spot.name}`;
  elements.bookingSummary.innerHTML = `
    <p class="mini-label">${t("reservation_summary")}</p>
    <h3>${spot.name}</h3>
    <p>${localizeDestination(state.search.destination)}</p>
    <p>${formatDate(state.search.date)} • ${state.search.startTime}</p>
    <p>${spot.duration >= 720 ? t("monthly_plan") : `${spot.duration} ${t("hours")}`} • ${spot.walkMinutes} ${t("min_walk")}</p>
    <p><strong>${formatCurrency(spot.totalPrice)}</strong> ${t("prepaid_online")}</p>
    <p>${interpolate("base_fee_line", {
      base: formatCurrency(spot.price),
      fee: formatCurrency(spot.serviceFee),
      zone: t(spot.zone === "premium" ? "zone_premium" : "zone_standard"),
    })}</p>
    <p>${spot.availableSpots} ${t("free_spots_live_now")}</p>
    <p>${t("entry_instructions")}: ${spot.access}</p>
  `;
  elements.bookingModal.showModal();
}

function closeBookingModal() {
  if (!elements.bookingModal) {
    return;
  }
  elements.bookingModal.close();
  elements.bookingForm.reset();
}

function createReservationCode() {
  return `GJV-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

function renderReservations() {
  if (!elements.reservationList) {
    return;
  }
  if (!state.reservations.length) {
    elements.reservationList.innerHTML = `
      <div class="empty-state">
        <h3>${t("no_reservations_yet")}</h3>
        <p>${t("reserve_map_pin")}</p>
      </div>
    `;
    return;
  }

  elements.reservationList.innerHTML = state.reservations
    .slice()
    .reverse()
    .map(
      (reservation) => `
        <article class="reservation-card">
          <div class="reservation-head">
            <div>
              <p class="mini-label">${localizeDestination(reservation.destination)}</p>
              <h4>${reservation.spotName}</h4>
              <p>${reservation.address}</p>
            </div>
            <div class="price-block">
              <strong>${formatCurrency(reservation.price)}</strong>
              <span>${reservation.paymentMethod}</span>
            </div>
          </div>
          <div class="reservation-meta">
            <span>${formatDate(reservation.date)} • ${reservation.startTime}</span>
            <span>${t("plate_label")} ${reservation.vehiclePlate}</span>
            <span>${reservation.code}</span>
          </div>
          <p><strong>${t("entry")}:</strong> ${reservation.access}</p>
          <div class="result-actions">
            <a class="button button-secondary" href="${reservation.mapLink}" target="_blank" rel="noreferrer">${t("navigate")}</a>
          </div>
        </article>
      `
    )
    .join("");
}

function handleSearch(event) {
  event.preventDefault();
  state.search = currentSearchFormValues();
  state.selectedSpot = null;
  renderAll();
}

function handleBookingSubmit(event) {
  event.preventDefault();
  if (!state.selectedSpot) {
    return;
  }

  const reservation = {
    code: createReservationCode(),
    spotId: state.selectedSpot.id,
    spotName: state.selectedSpot.name,
    destination: state.search.destination,
    address: state.selectedSpot.address,
    date: state.search.date,
    startTime: state.search.startTime,
    duration: state.selectedSpot.duration,
    price: state.selectedSpot.totalPrice,
    access: state.selectedSpot.access,
    mapLink: getMapLink(state.selectedSpot),
    paymentMethod: elements.paymentMethod.value,
    driverName: elements.driverName.value.trim(),
    driverEmail: elements.driverEmail.value.trim(),
    vehiclePlate: elements.vehiclePlate.value.trim().toUpperCase(),
    createdAt: new Date().toISOString(),
  };

  state.reservations.push(reservation);
  saveReservations();
  closeBookingModal();
  renderReservations();
}

function tickLiveAvailability() {
  state.liveInventory = state.liveInventory.map((spot) => {
    const delta = Math.floor(Math.random() * 7) - 3;
    const next = Math.max(1, Math.min(spot.capacity, spot.availableSpots + delta));
    return { ...spot, availableSpots: next };
  });
  renderAll();
}

function attachEvents() {
  elements.searchForm.addEventListener("submit", handleSearch);
  elements.sortSelect.addEventListener("change", renderAll);
  document.querySelectorAll(".map-zone-button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector("#destination").value = button.dataset.destination;
      state.search = currentSearchFormValues();
      state.selectedSpot = null;
      renderAll();
      document.querySelector("#map").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
  elements.languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.language = button.dataset.lang;
      localStorage.setItem("gjejvend-language", state.language);
      applyStaticTranslations();
      renderAll();
    });
  });
  elements.mapPins.addEventListener("click", (event) => {
    const pin = event.target.closest(".map-pin");
    if (!pin) {
      return;
    }
    const results = sortResults(getFilteredResults(state.search), elements.sortSelect.value);
    state.selectedSpot = results.find((spot) => spot.id === pin.dataset.id) || null;
    renderAll();
  });
  elements.resultsGrid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-card-id]");
    if (card) {
      const results = sortResults(getFilteredResults(state.search), elements.sortSelect.value);
      state.selectedSpot = results.find((spot) => spot.id === card.dataset.cardId) || null;
      renderAll();
    }
  });
  document.addEventListener("click", (event) => {
    const reserveButton = event.target.closest(".reserve-button");
    if (reserveButton) {
      openBookingModal(reserveButton.dataset.id);
    }
  });
  elements.closeModal.addEventListener("click", closeBookingModal);
  elements.cancelBooking.addEventListener("click", closeBookingModal);
  elements.bookingForm.addEventListener("submit", handleBookingSubmit);
}

function init() {
  elements.dateInput.value = createDefaultDate();
  elements.startTimeInput.value = "09:00";
  state.search = currentSearchFormValues();
  applyStaticTranslations();
  attachEvents();
  renderAll();
  setInterval(tickLiveAvailability, 4000);
}

init();
