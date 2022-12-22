<template>
	<BRow>
		<BCol>
			<BCard v-for="(roster, index) in rosters" :key="index">
				<BCardHeader>
					<BButton v-b-toggle="`roster-${index}`">#{{ roster.id }} {{ roster.name }}</BButton>
				</BCardHeader>
				<BCollapse :id="`roster-${index}`">
					<BCardBody>
						<BFormGroup label="Name">
							<BFormInput v-model="roster.name"/>
						</BFormGroup>
						<BFormGroup label="Class">
							<BFormInput v-model="roster.class"/>
						</BFormGroup>
						<BFormGroup label="Level">
							<BFormInput type="number" v-model.number="roster.level" min="0" step="1"/>
						</BFormGroup>
						<BFormGroup label="Exp">
							<BFormInput type="number" v-model.number="roster.exp" min="0" step="1"/>
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
const { rosters } = storeToRefs(store);
</script>
