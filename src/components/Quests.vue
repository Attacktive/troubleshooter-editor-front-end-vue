<template>
	<BRow>
		<BCol>
			<BCard v-for="(quest, index) in quests" :key="quest.index">
				<BCardHeader>
					<BButton v-b-toggle="`quest-${index}`">#{{ quest.index }} {{ quest.name }}</BButton>
				</BCardHeader>
				<BCollapse :id="`quest-${index}`">
					<BCardBody>
						<BFormGroup label="Name">
							<BFormInput v-model="quest.name"/>
						</BFormGroup>
						<BFormGroup label="Stage">
							<BFormInput type="number" v-model.number="quest.stage" min="0" step="1"/>
						</BFormGroup>
					</BCardBody>
				</BCollapse>
			</BCard>
		</BCol>
	</BRow>
</template>

<script lang="ts" setup>
import { BButton, BCard, BCardBody, BCardHeader, BCol, BCollapse, BFormGroup, BFormInput, BRow } from "bootstrap-vue";
import { useStore } from "../store/store";
import { storeToRefs } from "pinia";

const store = useStore();
const { quests } = storeToRefs(store);
</script>
