import { MapPoolInfo } from './../types/general.d';
import { ref, Ref, computed, ComputedRef } from 'vue';
import { RelayDataRefs, ViewType, PoolMap } from "../types/general";

export default class RelayConnection {

    private relaySocket: WebSocket;
    private players: Ref<any[]>;
    private match: Ref<any>;
    private scores: Ref<any>;
    private scoresabers: Ref<any>;
    private lead: Ref<any>;
    private disconnected: Ref<any>;
    private leftTwitch: Ref<string>;
    private rightTwitch: Ref<string>;
    private viewMode: Ref<ViewType>;
    private currentMapPool: Ref<string>;

    constructor() {
        this.disconnected = ref(true);
        this.players = ref([] as any[]);
        this.match = ref({});
        this.scores = ref({});
        this.scoresabers = ref({});
        this.lead = ref({
            left: 0,
            right: 0,
        });
        this.leftTwitch = ref("");
        this.rightTwitch = ref("");
        this.viewMode = ref("player-map-view");
        this.currentMapPool = ref("1");

        this.relaySocket = new WebSocket("ws://localhost:2223");
        this.relaySocket.onmessage = message => this.onmessage(message);
        this.relaySocket.onopen = () => this.onopen();
        this.relaySocket.onclose = () => this.onclose();
        this.relaySocket.onerror = () => this.onerror();
    }

    onerror() {
        this.disconnected.value = true;
        console.log("Relay Error");
    }

    onopen() {
        this.disconnected.value = false;
        console.log("Relay Connected");
    }

    onclose() {
        console.log("Relay Disconnected. Retrying in 5 seconds...");
        setTimeout(() => {
            this.relaySocket = new WebSocket("ws://localhost:2223");
            this.relaySocket.onmessage = message => this.onmessage(message);
            this.relaySocket.onopen = () => this.onopen();
            this.relaySocket.onclose = () => this.onclose();
            this.relaySocket.onerror = () => this.onerror();
        }, 5000);
    }

    getUsersScoresaberIds() {
        return {
            left: computed(() => this.players.value[0]?.user_id),
            right: computed(() => this.players.value[1]?.user_id),
        }
    }

    getUsersScoresaberInfo(leftId: ComputedRef<string>, rightId: ComputedRef<string>) {
        const leftProfilePic = computed(() => this.scoresabers.value?.[leftId.value]?.profilePicture ?? "https://cdn.scoresaber.com/avatars/76561198436848521.jpg");
        const rightProfilePic = computed(() => this.scoresabers.value?.[rightId.value]?.profilePicture ?? "https://cdn.scoresaber.com/avatars/76561198347791418.jpg");
        const leftRank = computed(() => this.scoresabers.value?.[leftId.value]?.rank ?? 69);
        const rightRank = computed(() => this.scoresabers.value?.[rightId.value]?.rank ?? 69);
        const leftlocalrank = computed(() => this.scoresabers.value?.[leftId.value]?.countryRank ?? 42);
        const rightlocalrank = computed(() => this.scoresabers.value?.[rightId.value]?.countryRank ?? 42);
        const leftCountry = computed(() => this.scoresabers.value?.[leftId.value]?.country?.toLowerCase?.() ?? "de");
        const rightCountry = computed(() => this.scoresabers.value?.[rightId.value]?.country?.toLowerCase?.() ?? "us");
        const leftname = computed(() => this.players.value?.[0]?.name ?? "Player 1");
        const rightname = computed(() => this.players.value?.[1]?.name ?? "Player 2");
        const leftPlayerShown = computed(() => !!this.players.value?.[0] ?? false);
        const rightPlayerShown = computed(() => !!this.players.value?.[1] ?? false);
        const mapname = computed(() => this.match.value?.selected_level?.name ?? (
            leftPlayerShown.value && rightPlayerShown.value ? "Creating Match..." : "Waiting for Players..."
        ));
        const mapdiffname = computed(() => this.match.value?.selected_level?.name ?
            this.diffName(this.match.value?.selected_difficulty) ?? "" :
            ""
        );
        const leftCountryPath = computed(() => leftCountry.value
            ? `https://flagcdn.com/h40/${leftCountry.value.toLowerCase()}.png`
            : `https://flagcdn.com/h40/de.png`,
        );
        const rightCountryPath = computed(() => rightCountry.value
            ? `https://flagcdn.com/h40/${rightCountry.value.toLowerCase()}.png`
            : `https://flagcdn.com/h40/us.png`,
        );

        return {
            leftProfilePic, rightProfilePic, leftRank, rightRank, leftlocalrank, rightlocalrank,
            leftCountry, rightCountry, leftname, rightname, mapname, mapdiffname, leftPlayerShown, rightPlayerShown,
            leftCountryPath, rightCountryPath,
        }
    }

    diffName(diff: number) {
        switch (diff) {
            case 0: return "Easy";
            case 1: return "Normal";
            case 2: return "Hard";
            case 3: return "Expert";
            case 4: return "Expert+";
            default: return "";
        }
    }


    getScoreData(leftId: ComputedRef<string>, rightId: ComputedRef<string>) {
        const leftmisses = computed(() => this.default(this.scores.value[leftId.value]?.totalMisses ?? 0, 0));
        const rightmisses = computed(() => this.default(this.scores.value[rightId.value]?.totalMisses ?? 0, 0));
        const leftscore = computed(() => this.default(this.scores.value[leftId.value]?.score ?? 0, 0));
        const rightscore = computed(() => this.default(this.scores.value[rightId.value]?.score ?? 0, 0));
        const leftaccuracy = computed(() => this.default(((this.scores.value[leftId.value]?.accuracy ?? 0) * 100)?.toFixed?.(2), "00.00"));
        const rightaccuracy = computed(() => this.default(((this.scores.value[rightId.value]?.accuracy ?? 0) * 100)?.toFixed?.(2), "00.00"));
        const leftlead = computed(() => this.default(this.lead.value.left ?? 0, 0));
        const rightlead = computed(() => this.default(this.lead.value.right ?? 0, 0));
        const leftScoreShown = computed(() => this.default(true, false));
        const rightScoreShown = computed(() => this.default(true, false));

        return {
            leftmisses, rightmisses, leftscore, rightscore, leftaccuracy, rightaccuracy, leftlead, rightlead, leftScoreShown, rightScoreShown
        }
    }


    getConfigScoreData() {
        const leftlead = computed(() => this.lead.value.left);
        const rightlead = computed(() => this.lead.value.right);
        return {
            leftmisses: "",
            rightmisses: "",
            leftscore: "",
            rightscore: "",
            leftaccuracy: "",
            rightaccuracy: "",
            leftlead,
            rightlead,
        };
    }


    default(value: any, defaultValue: any) {
        return this.disconnected.value ? defaultValue : value;
    }


    getData(): RelayDataRefs {
        const scoresaberIds = this.getUsersScoresaberIds();
        const scoresaberData = this.getUsersScoresaberInfo(scoresaberIds.left, scoresaberIds.right);
        const scoreData = this.getScoreData(scoresaberIds.left, scoresaberIds.right);
        const seedInfo = this.getSeedInfo(scoresaberIds.left.value, scoresaberIds.right.value);
        const mapPoolInfo = this.getMapPoolInfo();
        const leftTwitch = this.leftTwitch;
        const rightTwitch = this.rightTwitch;

        return {
            lpid: scoresaberIds.left,
            rpid: scoresaberIds.right,
            ...scoresaberData,
            ...scoreData,
            ...seedInfo,
            leftTwitch,
            rightTwitch,
            mapPool: mapPoolInfo,
            viewMode: this.viewMode,
        };
    }

    getMapPoolInfo() : ComputedRef<MapPoolInfo> {
        return computed(() => {
            return {
                "1": {
                    poolName: "Map Pool 1",
                    warmupPoolName: "Warmup Pool 1",
                    poolMapsGroup1: [
                        { name: "Gakky", hash: "c288a19fe48fa676e7be8846b6ffb3021fb273c7" },
                        { name: "Gakky", hash: "B70AEEF2EE915CED48593422931E8BA2A1F4E973" },
                        { name: "Gakky", hash: "12FFB213E09E866172AABA442843BB3116C07316" },
                    ],
                    poolMapsGroup2: [
                        { name: "Gakky", hash: "1B9278797FA6D85D0201D1A261101F8CB9AC7DDE" },
                        { name: "Gakky", hash: "6612DFE7533EA5426ADFA378EEC4ED19E24233EB" },
                        { name: "Gakky", hash: "3D0561C0E4B18AA7A5C240FA2AC0C2052318A8D2" },
                    ],
                    poolMapsGroup3: [
                        { name: "Gakky", hash: "C6B7136536EF5647374198769B3211B2B2E4EE17" },
                        { name: "Gakky", hash: "D7CB32F23041DEC272DE3DA0AC141DD8F91478CA" },
                        { name: "Gakky", hash: "BBABE0DA40CE8F54C666DB99F58F8D03D5F7CEC7" },
                    ],
                    poolWarmupMapsGroup1: [
                        { name: "Gakky", hash: "C6B7136536EF5647374198769B3211B2B2E4EE17" },
                    ],
                    poolWarmupMapsGroup2: [
                        { name: "Gakky", hash: "C6B7136536EF5647374198769B3211B2B2E4EE17" },
                    ],
                    poolWarmupMapsGroup3: [
                        { name: "Gakky", hash: "C6B7136536EF5647374198769B3211B2B2E4EE17" },
                    ]
                }
            }[this.currentMapPool.value] as MapPoolInfo;
        });
    }

    getSeedInfo(leftPlayerId: string, rightPlayerId: string) {
        return {
            leftSeed: computed(() => 4),
            rightSeed: computed(() => 6),
        };
    }


    onmessage(message: MessageEvent<any>) {
        const data = JSON.parse(message.data);
        switch (data.type) {
            case "on-connection":
                console.log("Relay connected to TA");
                break;
            case "on-scoresaber-update":
                console.log("Received scoresaber update", data.scoresabers);
                this.scoresabers.value = data.scoresabers;
                break;
            case "game-state-update":
                this.players.value = data.players;
                this.match.value = data.match;
                break;
            case "score-update":
                this.scores.value = data.scores;
                break;
            case "lead-update":
                this.lead.value = {
                    left: data.leftLead,
                    right: data.rightLead,
                };
                break;
            case "twitch-update":
                this.leftTwitch.value = data.leftTwitch;
                this.rightTwitch.value = data.rightTwitch;
                break;
        }

        console.debug("Relay message", data);
    }

}