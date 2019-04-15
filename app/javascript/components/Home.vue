<template>
	<v-container fluid fill-height>
 		<v-layout align-center justify-center>
 			<Upload></Upload>
			<h1><router-link to="/dashboard" tag="span" style="cursor: pointer">View Submission</router-link></h1>


		</v-layout>
		<GetRate></GetRate>
	</v-container>
</template>

<script>
import GetRate from 'components/GetRate'
import Upload from 'components/Upload'

export default {
	components: {
		GetRate,
		Upload
	}
}
</script>
