<template>
	<main id="main-container">
		<BContainer v-if="fileUploadInProgress" id="spinner-container">
			<BSpinner id="spinner"/>
		</BContainer>
		<BModal v-model="modalDetails.shown" :title="modalDetails.title" :ok-title="modalDetails.buttonText" ok-only>
			{{ modalDetails.content }}
		</BModal>
		<BContainer ref="form" tag="form" fluid>
			<BRow class="p-2">
				<BCol>
					<h1 class="text-center">Troubleshooter Editor</h1>
				</BCol>
			</BRow>
			<BRow class="mt-3">
				<BCol>
					<BRow>
						<BCol xs="4">
							<BFormFile name="file" v-model="file" accept=".sav, .bak" clsas="mt-2"/>
						</BCol>
						<BCol xs="2">
							<BButton :disabled="!fileSelected" @click="upload">Upload</BButton>
						</BCol>
						<BCol>
							<BButton :disabled="!fileSelected || !fileUploaded" @click="save">Save</BButton>
						</BCol>
					</BRow>
				</BCol>
			</BRow>

			<BRow class="mt-4">
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
								<BFormTextarea :value="JSON.stringify(storeRepresentation)" :readOnly="true" rows="10"/>
							</BCardBody>
						</BCollapse>
					</BCard>
				</BCol>
			</BRow>

			<footer class="text-right">
				<BLink :href="githubRepository" target="_blank">
					<img src="./assets/github.svg" alt="to the GitHub repository" width="48" height="48"/>
				</BLink>
			</footer>
		</BContainer>
	</main>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { BButton, BCard, BCardBody, BCardHeader, BCol, BCollapse, BContainer, BFormFile, BFormTextarea, BLink, BModal, BRow, BSpinner, BTab, BTabs } from "bootstrap-vue";
import { SaveData } from "./types/save-data";
import Company from "./components/Company.vue";
import { useStore } from "./store/store";
import Items from "./components/Items.vue";
import Rosters from "./components/Rosters.vue";
import Quests from "./components/Quests.vue";
import { ModalDetails } from "@/types/ui";
import axios from "axios";

const githubRepository = import.meta.env.VITE_GITHUB_REPOSITORY;

const store = useStore();
const storeRepresentation = computed(() => ({
	company: store.company,
	items: store.items,
	rosters: store.rosters,
	quests: store.quests
}));

const modalDetails = ref<ModalDetails>({
	shown: false,
	title: "",
	content: "",
	buttonText: "OK"
});

const showModal = (title: string, content: string) => {
	modalDetails.value.shown = true;
	modalDetails.value.title = title;
	modalDetails.value.content = content;
}

const form = ref();
const file = ref(null);
const fileSelected = computed(() => !!file.value);
const fileUploaded = ref(false);
const fileUploadInProgress = ref(false);

const upload = () => {
	fileUploadInProgress.value = true;

	const formData = new FormData(form.value);

	axios.post<SaveData>(`${import.meta.env.VITE_API_ROOT}/upload`, formData)
		.then(response => response.data)
		.then(saveData => {
			store.$state = saveData;
			fileUploaded.value = true;
		})
		.catch(error => {
			console.error(error);
			showModal("Error", "Failed to upload the save data.");

			fileUploaded.value = false;
		})
		.finally(() => fileUploadInProgress.value = false);
};

const save = () => {
	showModal("Error", "Sorry but not implemented yet!");

	fileUploadInProgress.value = true;
};

const toShowData = ref(false);
const toggleCollapse = () => (toShowData.value = !toShowData.value);

</script>

<style>
@import "bootstrap/dist/css/bootstrap.css";

body {
	width: 100%;
	height: 100%;
}

#main-container {
	width: 100%;
	height: 100%;
}

#spinner-container {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 1;
	background-color: #80808080;
}

#spinner-container > #spinner {
	width: 6rem;
	height: 6rem;
	margin-top: 45%;
	margin-left: 45%;
}
</style>
