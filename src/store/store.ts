import { defineStore } from "pinia";
import { defaultCompany, ItemCollection, QuestCollection, RosterCollection } from "@/types/save-data";
import { ref } from "vue";

export const useStore = defineStore(
	"saveData", {
		state: () => {
			const company = ref(defaultCompany);
			const items = ref<ItemCollection>([]);
			const rosters = ref<RosterCollection>([]);
			const quests = ref<QuestCollection>([]);

			return { company, items, rosters, quests };
		}
	}
);
