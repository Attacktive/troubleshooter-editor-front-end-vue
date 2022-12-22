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
							<BButton :disabled="!fileSelected || !fileUploaded">Save</BButton>
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
				<BLink :href="gitHubUrl" target="_blank">
					<img :src="github" alt="to the GitHub repository" width="48" height="48"/>
				</BLink>
			</footer>
		</BContainer>
	</main>
</template>

<script setup lang="ts">
import github from "./assets/github.svg";
import { computed, ref } from "vue";
import { apiRoot, gitHub as gitHubUrl } from "./constants";
import { BButton, BCard, BCardBody, BCardHeader, BCol, BCollapse, BContainer, BForm, BFormFile, BFormTextarea, BLink, BRow, BTab, BTabs } from "bootstrap-vue";
import { parse } from "./types";
import _ from "lodash";
import Company from "./components/Company.vue";
import { useStore } from "./store/store";
import Items from "./components/Items.vue";
import Rosters from "./components/Rosters.vue";
import Quests from "./components/Quests.vue";

const store = useStore();

let fileUploaded = false;

const file = ref(null);
const fileSelected = computed(() => !!file.value);
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
		_.assign(store, parse(object));
		fileUploaded = true;
	})
	.catch(error => {
		console.log(error);

		fileUploaded = false;
	});
};

const toShowData = ref(false);
const toggleCollapse = () => (toShowData.value = !toShowData.value);

</script>

<style>
@import "bootstrap/dist/css/bootstrap.css";
</style>
