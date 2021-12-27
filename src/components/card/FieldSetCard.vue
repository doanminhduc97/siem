<template>
  <div class="container">
    <div style="position: relative">
      <fieldset class="euiCard">
        <legend>{{ cardLabel }}</legend>
        <slot name="card-content" class="cardFlexItem align-items-center"></slot>
      </fieldset>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FieldSetCard',
  props: {
    cardLabel: {
      type: String,
      default: '',
    },
  },
}
</script>
<style lang="scss" scoped>
.container {
  background-color: #fafbfd;
  padding: 12px 0;
  padding-bottom: 0px;
}

.euiCard {
  border: 0;
  border: 1px solid #d3dae6;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  padding: 20px;
  position: relative;
  overflow: visible;
}

.euiCard legend {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 50%;
  background-color: #fff;
  display: inline-block;
  padding: 0 16px;
  border-radius: 24px;
  box-shadow: inset 0 0 0 1px #d3dae6;
  vertical-align: super;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 24px;
  text-align: center;
  white-space: nowrap;
  cursor: default;
}

.cardFlexItem {
  margin: 12px;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
}

.align-items-center {
  align-items: center;
}
</style>