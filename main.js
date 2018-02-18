const AudioContext = window.AudioContext || window.webkitAudioContext;

Vue.use(Vuex)

function audioSource() {
  var context = new AudioContext()
  return {
    src: 'https://stream.rabe.ch/livestream/rabe-low.opus',
    webAudio: {
      context: context,
    }
  }
}

const store = new Vuex.Store({
  state: {
    systems: [
      {
        id: 1,
        hostname: 'test-01',
        stream: {
          video: 'https://raw.githubusercontent.com/radiorabe/rabe-artwork/master/dab/mot/dab-mot-rabe-logo.png',
          audio: audioSource('audio')
        },
      },
      {
        id: 2,
        hostname: 'test-02',
        stream: {
          video: 'https://raw.githubusercontent.com/radiorabe/rabe-artwork/master/dab/mot/dab-mot-rabe-logo.png',
          audio: {
            src: 'https://stream.rabe.ch/livestream/rabe-low.opus',
            context: new AudioContext()
          }
        }
      },
      {
        id: 3,
        hostname: 'test-03',
        stream: {
          video: 'https://raw.githubusercontent.com/radiorabe/rabe-artwork/master/dab/mot/dab-mot-rabe-logo.png',
          audio: {
            src: 'https://stream.rabe.ch/livestream/rabe-low.opus',
            context: new AudioContext()
          }
        }
      }
    ]
  },
  mutations: {
    add_server(state, new_server) {
      server.push(new_server)
    }
  }
})

const Dashboard = {
  template: `
    <article class="page">
      <header>
        <h1>
          <span class="fa fa-tachometer" title="Dashboard"></span>
          <span>Dashboard</span>
        </h1>
      </header>
      <section class="cards-pf container-fluid container-cards-pf">
        <div class="row row-cards-pf">
          <div class="col-md-4" v-for="system in systems">
            <pf-card :title="system.hostname">
              <img :src="system.stream.video"/>
              <audio ref="audio" @timeupdate="onTimeUpdateListener" controls :src="system.stream.audio.src"></audio>
            </pf-card>
          </div>
        </div>
      </section>
    </article>
  `,
  data() {
    return {
      systems: store.state.systems
    }
  },
  methods: {
    onTimeUpdateListener() {
      this.currentTime = this.$refs.audio.currentTime
    }
  }
}

const OutsideBroadcastCard = {
}

const Settings = {
  template: `
    <article class="page">
      <header>
        <h1>
          <span class="pficon pficon-settings" title="Settings"></span>
          <span>Settings</span>
        </h1>
      </header>
      <section>
        <h2>Systems</h2>
        <pf-table :striped="true" :bordered="true" :columns="['Host']" :rows.sync="systems">
          <template scope="data">
            <td>{{ data.row.hostname }}</td>
          </template>
        </pf-table>
      </section>
    </article>
  `,
  data() {
    return {
      systems: store.state.systems
    }
  }
}

const routes = [
  { path: '/', component: Dashboard },
  { path: '/settings', component: Settings }
]

const router = new VueRouter({
  routes
})

const app = new Vue({
  router
}).$mount('#app')
