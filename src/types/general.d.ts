import { Ref, ComputedRef } from 'vue';

export interface PoolMap {
    name: string;
    hash: string;
}

export interface MapPoolInfo {
    poolName: string
    warmupPoolName: string
    poolMapsGroup1: PoolMap[]
    poolMapsGroup2: PoolMap[]
    poolMapsGroup3: PoolMap[]
    poolWarmupMapsGroup1: PoolMap[]
    poolWarmupMapsGroup2: PoolMap[]
    poolWarmupMapsGroup3: PoolMap[]
}

export interface RelayDataRefs {
    lpid: ComputedRef<string>
    rpid: ComputedRef<string>
    rightScoreShown: ComputedRef<boolean>
    leftmisses: ComputedRef<number>
    rightmisses: ComputedRef<number>
    leftscore: ComputedRef<number>
    rightscore: ComputedRef<number>
    leftaccuracy: ComputedRef<number>
    rightaccuracy: ComputedRef<number>
    leftlead: ComputedRef<number>
    rightlead: ComputedRef<number>
    leftScoreShown: ComputedRef<boolean>
    rightScoreShown: ComputedRef<boolean>
    leftTwitch: Ref<string>
    rightTwitch: Ref<string>
    viewMode: Ref<ViewType>,
    leftProfilePic: ComputedRef<string>
    rightProfilePic: ComputedRef<string>
    leftRank: ComputedRef<number>
    rightRank: ComputedRef<number>
    leftlocalrank: ComputedRef<number>
    rightlocalrank: ComputedRef<number>
    leftCountry: ComputedRef<string>
    rightCountry: ComputedRef<string>
    leftname: ComputedRef<string>
    rightname: ComputedRef<string>
    mapname: ComputedRef<string>
    mapdiffname: ComputedRef<string>
    leftPlayerShown: ComputedRef<boolean>
    rightPlayerShown: ComputedRef<boolean>
    leftCountryPath: ComputedRef<string>
    rightCountryPath: ComputedRef<string>
    leftSeed: ComputedRef<number>
    rightSeed: ComputedRef<number>
    mapPool: ComputedRef<MapPoolInfo>
    mapPoolMap: ComputedRef<PoolMap>
}

export type ViewType = "in-map-view" | "player-info-view" | "map-pool-view" | "warmups-pool-view" | "player-map-view"