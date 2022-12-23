<template>
	<main>
		<BContainer fluid>
			<BRow class="p-2">
				<BCol>
					<h1 class="text-center">Troubleshooter Editor</h1>
				</BCol>
			</BRow>
			<BRow class="mt-3">
				<BCol>
					<BRow>
						<BCol xs="4">
							<BForm ref="fileForm" class="mt-2">
								<BFormFile name="file" v-model="file" accept=".sav, .bak"/>
							</BForm>
						</BCol>
						<BCol xs="2">
							<BButton :disabled="!fileSelected" @click="upload">Upload</BButton>
						</BCol>
						<BCol>
							<BButton :disabled="!fileUploaded" @click="diff">Diff</BButton>
						</BCol>
					</BRow>
				</BCol>
			</BRow>

			<BRow tag="form" ref="mainForm" class="mt-4">
				<BCol>
					<BTabs>
						<BTab title="Company" key="company">
							<Company/>
						</BTab>
						<BTab title="Items" key="items">
							<Items/>
						</BTab>
						<BTab title="Rosters" key="rosters">
							<Rosters/>
						</BTab>
						<BTab title="Quests" key="quests">
							<Quests/>
						</BTab>
					</BTabs>
				</BCol>
			</BRow>

			<BRow class="mt-4">
				<BCol>
					<BCard>
						<BCardHeader>
							<BButton @click="toggleCollapse">{{ toShowData? "Collapse": "Expand"}}</BButton>
						</BCardHeader>
						<BCollapse v-model="toShowData">
							<BCardBody>
								<BFormTextarea :value="JSON.stringify(store)" :readOnly="true" rows="10"/>
							</BCardBody>
						</BCollapse>
					</BCard>
				</BCol>
			</BRow>

			<footer class="text-right">
				<BLink :href="gitHub" target="_blank">
					<img src="./assets/github.svg" alt="to the GitHub repository" width="48" height="48"/>
				</BLink>
			</footer>
		</BContainer>
	</main>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { apiRoot, gitHub } from "./constants";
import { BButton, BCard, BCardBody, BCardHeader, BCol, BCollapse, BContainer, BForm, BFormFile, BFormTextarea, BLink, BRow, BTab, BTabs } from "bootstrap-vue";
import { defaultSaveData, parse } from "./types";
import _ from "lodash";
import Company from "./components/Company.vue";
import { useStore } from "./store/store";
import Items from "./components/Items.vue";
import Rosters from "./components/Rosters.vue";
import Quests from "./components/Quests.vue";
import { diff as justDiff } from "just-diff";
import { Ref, UnwrapRef } from "vue/types/v3-generated";

const store = useStore();

let initialData = defaultSaveData;

const file = ref(null);
const fileSelected = computed(() => !!file.value);
const fileUploaded: Ref<UnwrapRef<boolean>> = ref(false);
const fileForm = ref<HTMLFormElement | undefined>();

const upload = () => {
	const formData = new FormData(fileForm.value);

	fetch(
		`${apiRoot}/upload`,
		{
			method: "post",
			body: formData
		}
	)
	.then(response => response.json())
	.then(object => {
		initialData = parse(object);

		store.company = _.cloneDeep(initialData.company);
		store.items = _.cloneDeep(initialData.items);
		store.rosters = _.cloneDeep(initialData.rosters);
		store.quests = _.cloneDeep(initialData.quests);

		fileUploaded.value = true;
	})
	.catch(error => {
		console.log(error);

		fileUploaded.value = false;
	});
};

const diff = () => {
	const ref = storeToRefs(store);
	const toSave = {
		company: ref.company.value,
		items: ref.items.value,
		rosters: ref.rosters.value,
		quests: ref.quests.value
	};

	console.log("diff", justDiff(initialData, toSave));
};

const toShowData = ref(false);
const toggleCollapse = () => (toShowData.value = !toShowData.value);

</script>

<style>
@import "bootstrap/dist/css/bootstrap.css";
</style>
