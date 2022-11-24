import { ref, Ref, computed, ComputedRef } from 'vue';

export default class RelayConnection {

    private relaySocket: WebSocket;
    private players: Ref<any[]>;
    private match: Ref<any>;
    private scores: Ref<any>;
    private scoresabers: Ref<any>;
    private lead: Ref<any>;
    private disconnected: Ref<any>;

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

        return {
            leftProfilePic, rightProfilePic, leftRank, rightRank, leftlocalrank, rightlocalrank,
            leftCountry, rightCountry, leftname, rightname, mapname, mapdiffname, leftPlayerShown, rightPlayerShown,
        }
    }

    diffName(diff: number) {
        switch(diff) {
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


    getData(): any {
        const scoresaberIds = this.getUsersScoresaberIds();
        const scoresaberData = this.getUsersScoresaberInfo(scoresaberIds.left, scoresaberIds.right);
        const scoreData = this.getScoreData(scoresaberIds.left, scoresaberIds.right);

        return {
            lpid: scoresaberIds.left,
            rpid: scoresaberIds.right,
            ...scoresaberData,
            ...scoreData,
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
        }

        console.debug("Relay message", data);
    }

}