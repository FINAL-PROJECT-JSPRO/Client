<template>
  <v-content>
    <div class="about-page">
      <div class="about-course">
        <h2 class="about-course-heading letter-spacing-heading">About the course</h2>
        <div class="width-3rem height-4 rounded bg-primary mx-auto mb-4"></div>
        <v-row class="about-course-content">
          <v-col sm="12" md="6">
            <p>Technologists need the latest skills to do their jobs effectively.
              And technology leaders need visibility into how their teams work to put the right people on the right projects.
              JSPro gives you both—the skills and data you need to succeed.</p>
            <p>Our commitment to drive significant, lasting social impact by improving equal access to technology skills and investing in catalytic solutions.</p>
            <p>Growth your career with complete courses</p>
            <ul class="list-unstyled list-style-icon list-icon-check my-4">
              <li>
                <v-icon class="icon-medium icon-check mr-2">fas fa-check</v-icon>&nbsp;Focused subject concentrations
              </li>
              <li>
                <v-icon class="icon-medium icon-check mr-2">fas fa-check</v-icon>&nbsp;Usually 3 or more coordinated courses
              </li>
              <li>
                <v-icon class="icon-medium icon-check mr-2">fas fa-check</v-icon>&nbsp;Develop a skill set within a specific area
              </li>
            </ul>
            <div class="btn-link-wrapper">
              <router-link class="btn-link" to="/courses">
                Start Learning Now
              </router-link>
            </div>
          </v-col>
          <v-col sm="12" md="6">
            <v-img src="../assets/images/working.jpg" class="img-responsive" />
          </v-col>
        </v-row>
      </div>
    </div>
  </v-content>
</template>

<style lang="scss" scoped>
  .about-page {
    padding-left: 10px
  }
  .about-course {
    padding-top: 2rem;
    padding-bottom: 5rem;
    &-heading {
      font-size: 1.8rem;
      text-align: center;
    }

    &-content {
      padding-top: 1.5rem;
      p {
        text-align: justify;
      }
    }
  }
  .width-3rem {
    width: 3rem!important;
  }
  .height-4 {
    height: 0.25rem;
  }
  .bg-primary {
    background-color: #00CB54!important;
    color: #fff;
  }

  .list-unstyled {
    padding-left: 0;
    list-style: none;
  }

  .icon-medium {
    font-size: 1rem;
  }

  .icon-check {
    color: rgb(255, 193, 7);
  }

  .list-style-icon {
    > li {
      position: relative;
      margin-bottom: 0.3125rem;
    }
  }

  .btn-link-wrapper {
    margin-top: 1rem;
    display: inline-block;
  }

  .btn-link {
    padding: 1rem 2rem;
    text-decoration: none;
    color: #fff;
    background-color: #FFC107;
    border-color: #FFC107;
    border-radius: 20px;
  }
</style>
