<template>
	<BRow>
		<BCol>
			<BFormGroup label="ID">
				<BFormInput type="number" :readonly="true" v-model.number="company.id"/>
			</BFormGroup>
			<BFormGroup label="Name">
				<BFormInput v-model="company.name"/>
			</BFormGroup>
			<BFormGroup label="Vill">
				<BFormInput type="number" v-model.number="company.vill"/>
			</BFormGroup>
			<BFormGroup label="Difficulty">
				<BFormSelect v-model="company.properties.GameDifficulty">
					<BFormSelectOption value="None" :disabled="true">Choose one</BFormSelectOption>
					<BFormSelectOption value="Story">Story</BFormSelectOption>
					<BFormSelectOption value="Safty">Safety</BFormSelectOption>
					<BFormSelectOption value="Easy">Easy</BFormSelectOption>
					<BFormSelectOption value="Normal">Normal</BFormSelectOption>
					<BFormSelectOption value="Hard">Hard</BFormSelectOption>
					<BFormSelectOption value="Merciless">Cruel</BFormSelectOption>
				</BFormSelect>
			</BFormGroup>
		</BCol>
	</BRow>
</template>

<script lang="ts" setup>
import { BCol, BFormGroup, BFormInput, BFormSelect, BFormSelectOption, BRow } from "bootstrap-vue";
import { useStore } from "@/store/store";
import { storeToRefs } from "pinia";

const store = useStore();
const { company } = storeToRefs(store);
</script>
