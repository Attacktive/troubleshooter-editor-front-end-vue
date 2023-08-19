<template>
	<main>
		<BModal v-model="modalDetails.shown" :title="modalDetails.title" :ok-title="modalDetails.buttonText" ok-only>
			{{ modalDetails.content }}
		</BModal>
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
							<BButton :disabled="!fileSelected || !fileUploaded" @click="save">Save</BButton>
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
import { BButton, BCard, BCardBody, BCardHeader, BCol, BCollapse, BContainer, BForm, BFormFile, BFormTextarea, BLink, BModal, BRow, BTab, BTabs } from "bootstrap-vue";
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

const fileUploaded = ref(false);

const file = ref(null);
const fileSelected = computed(() => !!file.value);
const fileForm = ref<HTMLFormElement | undefined>();

const upload = () => {
	const formData = new FormData(fileForm.value);

	axios.post<SaveData>(`${import.meta.env.VITE_API_ROOT}/upload`, formData)
	.then(response => response.data)
	.then(saveData => {
		store.$state = saveData;
		fileUploaded.value = true;
	})
	.catch(error => {
		console.log(error);

		fileUploaded.value = false;
	});
};

const save = () => {
	showModal("Error", "Sorry but not implemented yet!");
};

const toShowData = ref(false);
const toggleCollapse = () => (toShowData.value = !toShowData.value);

</script>

<style>
@import "bootstrap/dist/css/bootstrap.css";
</style>
