import { ref, Ref, computed, ComputedRef } from 'vue';

export default class RelayConnection {

    private relaySocket: WebSocket;
    private players: Ref<any[]>;
    private matches: Ref<any>;
    private scores: Ref<any>;
    private scoresabers: Ref<any>;
    private lead: Ref<any>;
    private disconnected: Ref<any>;

    constructor() {
        this.relaySocket = new WebSocket("ws://localhost:2223");
        this.relaySocket.onmessage = message => this.onmessage(message);
        this.relaySocket.onopen = () => this.onopen();
        this.relaySocket.onclose = () => this.onclose();
        this.relaySocket.onerror = () => this.onerror();

        this.disconnected = ref(true);
        this.players = ref([] as any[]);
        this.matches = ref({});
        this.scores = ref({});
        this.scoresabers = ref({});
        this.lead = ref({
            left: 0,
            right: 0,
        });
    }

    onerror() {
        this.disconnected.value = true;
        console.log("Relay Error");
        this.updateScoresabers();
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
            left: computed(() => this.disconnected.value ? "76561198436848521" : this.players.value[0]?.user_id),
            right: computed(() => this.disconnected.value ? "76561198347791418" : this.players.value[1]?.user_id),
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
        const mapname = computed(() => this.matches.value?.[0]?.selected_level?.name ?? "Map Name");
        const mapdiffname = computed(() => this.diffName(this.matches.value?.[0]?.selected_difficulty) ?? "Difficulty");

        return {
            leftProfilePic, rightProfilePic, leftRank, rightRank, leftlocalrank, rightlocalrank,
            leftCountry, rightCountry, leftname, rightname, mapname, mapdiffname
        }
    }

    diffName(diff: number) {
        switch(diff) {
            case 0: return "Easy";
            case 1: return "Normal";
            case 2: return "Hard";
            case 3: return "Expert";
            case 4: return "Expert+";
            default: return "Difficulty";
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
        switch (data.Type) {
            case 0: return console.log("Relay connected to TA");
            case 1: return this.onHeartBeat(data);
            case 3: return this.onMatchUpdate(data);
            case 4: return this.onScoreUpdate(data);
            case 6: return this.onUsersUpdate(data);
        }

        switch (data.command) {
            case "update-lead":
                return this.lead.value = {
                    left: data.leftLead,
                    right: data.rightLead,
                };
            case "update-scoresabers":
                return this.scoresabers.value = data.scoresabers;
        }

        console.debug("Relay message", data);
    }


    onHeartBeat(data) {
        console.debug("Heartbeat");
        this.disconnected.value = false;
        this.onUsersUpdate(data, true);
        this.onMatchUpdate(data, true);
    }


    onMatchUpdate(ms, heartbeat = false) {
        if (heartbeat) {
            console.debug("Heartbeat Match Update", ms);
        } else {
            console.log("Match Update", ms);
        }

        this.matches.value = ms.matches;
    }


    onUsersUpdate(pls, heartbeat = false) {
        if (heartbeat) {
            console.debug("Heartbeat User Update", pls);
        } else {
            console.log("User Update", pls);
        }

        this.players.value = [...new Map(pls.players.map(item => [item["user_id"], item])).values()];
        this.updateScoresabers();
    }


    onScoreUpdate(scs) {
        console.log("Scores Update", scs);
        this.scores.value[scs.user_id] = scs;
    }

    async updateScoresabers() {
        this.relaySocket.send(JSON.stringify({
            command: "update-scoresabers",
            ids: this.players.value.map(p => p.user_id)
        }));
    }

}