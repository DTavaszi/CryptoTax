 <template>
	 <v-content>
	 	<v-container fluid fill-height>
	 		<v-layout align-center justify-center>
	 			<v-flex xs12 sm8 md4>
	 				<input type="file" ref="file" @change="upload()"/>
 					<v-btn dark color="deep-purple darken-1" @click="submit()">Submit</v-btn>
	            </v-flex>
	        </v-layout>
	    </v-container>
	</v-content>
</template>
<script>
import axios from 'axios'
const API_ENDPOINT = "http://localhost:3000/spreadsheets/import"
const HEADER = { 'Content-Type': 'multipart/form-data' }

export default {
	data: function(){
		return {
			file: ''
      	}
    },
    methods: {
    	submit(){
    		let formData = new FormData()
            formData.append('file', this.file)
            axios.post(API_ENDPOINT, formData)
            .then(function(){
          		console.log('File successfuly uploaded!')
          	})
        	.catch(function(){
          		console.log('Something went wrong!')
        	})
      	},

      upload(){
        this.file = this.$refs.file.files[0]
      }
    }
  }
</script>
