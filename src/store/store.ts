import { defineStore } from "pinia";
import { defaultCompany, ItemCollection, QuestCollection, RosterCollection } from "../types";
import { Ref, ref, UnwrapRef } from "vue";

export const useStore = defineStore(
	"saveData",
	() => {
		const company = ref(defaultCompany);
		const items: Ref<UnwrapRef<ItemCollection>> = ref([]);
		const rosters: Ref<UnwrapRef<RosterCollection>> = ref([]);
		const quests: Ref<UnwrapRef<QuestCollection>> = ref([]);

		return { company, items, rosters, quests };
	}
);
