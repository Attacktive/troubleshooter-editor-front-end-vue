<template>
	<BRow>
		<BCol>
			<BCard v-for="(item, index) in items" :key="item.index">
				<BCardHeader>
					<BButton v-b-toggle="`item-${index}`">#{{ item.id }} {{ item.type }}</BButton>
				</BCardHeader>
				<BCollapse :id="`item-${index}`">
					<BCardBody>
						<BFormGroup label="Type" className="mt-2">
							<BFormInput v-model="item.type"/>
						</BFormGroup>
						<BFormGroup label="Count" className="mt-2">
							<BFormInput type="number" v-model.number="item.count" min="0" step="1"/>
						</BFormGroup>
						<BFormGroup label="Status" className="mt-2">
							<BFormSelect v-model="item.status">
								<BFormSelectOption value="inventory">Inventory</BFormSelectOption>
								<BFormSelectOption value="equipped">Equipped</BFormSelectOption>
							</BFormSelect>
						</BFormGroup>
						<BFormGroup label="New?" className="mt-3">
							<BFormSelect :options="trueOrFalse" v-model="item.properties['IsNew']"/>
						</BFormGroup>
						<BFormGroup label="OptionKey" className="mt-2">
							<BFormInput list="option-keys" v-model="item.properties['Option/OptionKey']"/>
							<BFormDatalist id="option-keys" :options="optionKeys"/>
						</BFormGroup>
						<BFormGroup label="Bound to the character?" className="mt-2">
							<BFormSelect :options="trueOrFalse" v-model="item.properties['Binded']"/>
						</BFormGroup>
						<BFormGroup label="Protected?" className="mt-2">
							<BFormSelect :options="trueOrFalse" v-model="item.properties['Protected']"/>
						</BFormGroup>
						<BFormGroup label="Property 1" className="mt-3">
							<BFormInput list="options-datalist" v-model="item.properties['Option/Type1']"/>
							<BFormDatalist id="options-datalist" :options="options"/>
							<BFormInput v-model="item.properties['Option/Value1']"/>
						</BFormGroup>
						<BFormGroup label="Property 2" className="mt-2">
							<BFormInput list="options-datalist" v-model="item.properties['Option/Type2']"/>
							<BFormDatalist id="options-datalist" :options="options"/>
							<BFormInput v-model="item.properties['Option/Value2']"/>
						</BFormGroup>
						<BFormGroup label="Property 3" className="mt-2">
							<BFormInput list="options-datalist" v-model="item.properties['Option/Type3']"/>
							<BFormDatalist id="options-datalist" :options="options"/>
							<BFormInput v-model="item.properties['Option/Value3']"/>
						</BFormGroup>
						<BFormGroup label="Property 4" className="mt-2">
							<BFormInput list="options-datalist" v-model="item.properties['Option/Type4']"/>
							<BFormDatalist id="options-datalist" :options="options"/>
							<BFormInput v-model="item.properties['Option/Value4']"/>
						</BFormGroup>
					</BCardBody>
				</BCollapse>
			</BCard>
		</BCol>
	</BRow>
</template>

<script lang="ts" setup>
import { BButton, BCard, BCardBody, BCardHeader, BCol, BCollapse, BFormDatalist, BFormGroup, BFormInput, BFormSelect, BFormSelectOption, BRow } from "bootstrap-vue";
import { useStore } from "../store/store";
import { storeToRefs } from "pinia";

const store = useStore();
const { items } = storeToRefs(store);

const trueOrFalse = ["true", "false"];

const options = [
	"None",
	"Accuracy",
	"Armor",
	"AttackPower",
	"Block",
	"BluntResistance",
	"CriticalStrikeChance",
	"CriticalStrikeDeal",
	"Dodge",
	"ESPPower",
	"FireResistance",
	"IceResistance",
	"LightningResistance",
	"MaxHP",
	"MoveDist",
	"OverchargeDuration",
	"Resistance",
	"SightRange",
	"SlashingResistance",
	"Speed"
	// TODO: add known options
];

const optionKeys = [
	"Adventurer",
	"Ascetic",
	"Chaser",
	"Cyclopes",
	"Emperor",
	"Extreme",
	"FlameArrow",
	"FlameSoldier",
	"FlashGuardian",
	"FlashOverload",
	"FlashSoldier",
	"FrostMage",
	"FrostSoldier",
	"Hunter",
	"Infallibility",
	"King",
	"Looter",
	"Lupin",
	"MartialArtist",
	"MeteorScout",
	"MistGuardian",
	"MistRuler",
	"MistScout",
	"MistSentinel",
	"MistSoldier",
	"MoonSentinel",
	"MoonScout",
	"StarGuardian",
	"StormGuardian",
	"TwilightCollector",
	"VerdureRuler",
	"VerdureSentinel",
	"VerdureSoldier",
	"Zenith"
];
</script>
