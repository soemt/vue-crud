<template>
  <v-dialog
    v-model="confirmDialog"
    width="500"
  >
  <v-card>
  <v-card-title class="text-h5 pb-6">
    {{title}}
  </v-card-title>
  <v-card-text class="px-6">
    {{message}}
  </v-card-text>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn
      color="primary"
      @click="confirmDialog = false"
    >
      Cancel
    </v-btn>
    <v-btn
      color="error"
      @click="confirmation()"
    >
      DELETE
    </v-btn>
  </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script>

export default {
    name: 'ConfirmDialogue',

    data: () => ({
        // Parameters that change depending on the type of dialogue
        title: undefined,
        message: undefined, // Main text content
        okButton: undefined, // Text for confirm button; leave it empty because we don't know what we're using it for
        cancelButton: 'Go Back', // text for cancel button
        
        // Private variables
        resolvePromise: undefined,
        rejectPromise: undefined,
    }),

    methods: {
        show(opts = {}) {
            this.title = opts.title
            this.message = opts.message
            this.okButton = opts.okButton
            if (opts.cancelButton) {
                this.cancelButton = opts.cancelButton
            }
            // Once we set our config, we tell the popup modal to open
            this.$refs.popup.open()
            // Return promise so the caller can get results
            return new Promise((resolve, reject) => {
                this.resolvePromise = resolve
                this.rejectPromise = reject
            })
        },

        _confirm() {
            this.$refs.popup.close()
            this.resolvePromise(true)
        },

        _cancel() {
            this.$refs.popup.close()
            this.resolvePromise(false)
            // Or you can throw an error
            // this.rejectPromise(new Error('User cancelled the dialogue'))
        },
    },
}
</script>
