<template>
  <Listbox v-model="selected" :disabled="disabled" as="div" class="relative">
    <ListboxLabel v-if="label" class="block text-sm font-bold tracking-widest text-brand-charcoal  mb-1.5">
      {{ label }}
    </ListboxLabel>
    <div class="relative">
      <ListboxButton
        class="relative w-full cursor-default border border-slate-300 rounded-lg py-4 pl-4 pr-10 text-left focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all text-sm bg-white shadow-sm"
      >
        <span class="block truncate font-medium text-slate-700 tracking-wide">{{ selectedLabel || placeholder }}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
          <LucideChevronDown class="h-5 w-5 text-slate-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-sm bg-white py-1 text-xs shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <ListboxOption
            v-slot="{ active, selected: isSelected }"
            v-for="option in options"
            :key="typeof option === 'string' ? option : option.value"
            :value="typeof option === 'string' ? option : option.value"
            as="template"
          >
            <li
              :class="[
                active ? 'bg-brand-gold/5 text-brand-gold' : 'text-brand-charcoal',
                'relative cursor-default select-none py-3 pl-10 pr-4 transition-colors font-light',
              ]"
            >
              <span :class="[isSelected ? 'font-bold' : 'font-normal', 'block truncate  tracking-widest text-sm']">
                {{ typeof option === 'string' ? option : option.label }}
              </span>
              <span
                v-if="isSelected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-brand-gold"
              >
                <LucideCheck class="h-4 w-4" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup>
import { computed } from 'vue';
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import { LucideChevronDown, LucideCheck } from 'lucide-vue-next';

const props = defineProps({
  modelValue: [String, Number, Object],
  options: {
    type: Array,
    required: true,
  },
  label: String,
  placeholder: {
    type: String,
    default: 'Select option',
  },
  disabled: Boolean,
});

const emit = defineEmits(['update:modelValue']);

const selected = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const selectedLabel = computed(() => {
  const option = props.options.find((o) => 
    typeof o === 'string' ? o === props.modelValue : o.value === props.modelValue
  );
  return typeof option === 'string' ? option : option?.label;
});
</script>
