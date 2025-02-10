<template>
  <v-container fluid class="d-flex justify-center align-center" style="height: 100vh; background-color: #f5f5f5">
    <v-row align ="center" justify="center" class="elevation-4" style="width: 80%; max-height: 500px; background-color: white;">
      <!-- Section de gauche avec l'image -->
      <v-col cols="12" md="6" class="d-flex align-center justify-center" style="background-color: #4caf50;">
        <v-img
          src="https://via.placeholder.com/400x400?text=Login+Image"
          alt="Login Illustration"
          contain
          style="width: 80%; max-height: 300px"
        ></v-img>
      </v-col>
      <!-- Section de droite avec le formulaire -->
      <v-col cols="12" md="6" class="pa-10">
        <h2 class="text-center mb-6">Connexion</h2>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="email"
            label="Adresse e-mail"
            type="email"
            outlined
            :rules="[rules.required, rules.email]"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Mot de passe"
            type="password"
            outlined
            :rules="[rules.required]"
            required
          ></v-text-field>
          <v-btn :disabled="!valid" color="primary" block class="mt-6" @click="login">
            Se connecter
          </v-btn>
          <p class="text-center mt-4">
            <a href="#" class="text-decoration-none">Mot de passe oublié ?</a>
          </p>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      valid: false,
      rules: {
        required: (value) => !!value || "Ce champ est requis.",
        email: (value) => {
          const pattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
          return pattern.test(value) || "Adresse e-mail invalide.";
        },
      },
    };
  },
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        console.log("Email:", this.email);
        console.log("Password:", this.password);
        alert("Connexion réussie !");
      }
    },
  },
};
</script>

<style scoped>
a {
  color: #4caf50;
}
</style>
