////////////////////////////////////////////////////////////
// EDIT TERMINALS
////////////////////////////////////////////////////////////
var edit = {show:true, xmlFile:'', templateFile:'', mode:'landscape', sortNum:0, sortAnswerNum:0, templateNum:0, answerNum:0, inputNum:0, videoNum:0, replay:false, con:''};

/*!
 * 
 * EDIT READY
 * 
 */
$(function() {
	 $.editor.enable = true;
});

function loadEditPage(){
	jQuery.ajax({ 
		 url: "editTools.html", dataType: "html" 
	}).done(function( responseHtml ) {
		loadTemplateXML('template.xml');
		
		$("body").prepend(responseHtml);
		buildEditButtons();
		loadEditQuestion(true);
		
		$('#gameHolder').addClass('editBorder');
		$('#option, #gameStatus, #buttonNextQues, #buttonPreviewQues').hide();
	});
}

function buildEditButtons(){
	$('#toggleShowOption').click(function(){
		toggleShowOption();
	});
	
	$("#modelist").change(function() {
		if($(this).val() != edit.mode){
			edit.mode = $(this).val();
			gameData.mode = $(this).val();
			
			var modeValue = 'Landscape';
			if(edit.mode == 'landscape'){
				modeValue = 'Portrait';
			}
			$('#updateQuestion').val('Update To '+modeValue);
			
			if(gameData.mode == 'landscape'){
				gameData.targetArray = quesLandscape_arr;
				gameData.targetAnswerSequence = quesLandscapeSequence_arr;
				gameData.targetAudio = audioLandscape_arr;
			}else{
				gameData.targetArray = quesPortrait_arr;
				gameData.targetAnswerSequence = quesPortraitSequence_arr;
				gameData.targetAudio = audioPortrait_arr;	
			}
			
			loadEditQuestion(true);
			loadEditVideo();
			loadEditAnswer();
			loadEditInput();
			loadEditExplanation();
			resizeGameFunc();
		}
	});
	
	buildQuestionList();
	
	$("#questionslist").change(function() {
		if($(this).val() != ''){
			gameData.questionNum = Number($(this).val());
			gameData.sequenceNum = gameData.sequence_arr[gameData.questionNum];
			edit.answerNum = 0;
			edit.inputNum = 0;
			edit.videoNum = 0;
			loadEditQuestion(true);
		}
	});
	
	$('#sortQuestion').click(function(){
		toggleEditOption('sort');
	});
	
	$('#newQuestion').click(function(){
		toggleEditOption('template');
	});
	
	$('#removeQuestion').click(function(){
		actionQuestion('remove');
	});
	
	$('#prevQuestion').click(function(){
		toggleQuestion(false);
	});
	
	$('#nextQuestion').click(function(){
		toggleQuestion(true);
	});
	
	$('#editQuestion').click(function(){
		toggleEditOption('question');
	});
	
	$('#editCategory').click(function(){
		toggleEditOption('category');
	});
	
	$('#editVideo').click(function(){
		toggleEditOption('video');
	});
	
	$('#editAnswers').click(function(){
		toggleEditOption('selectAnswer');
	});
	
	$('#editSelectAnswer').click(function(){
		toggleEditOption('answers');
	});
	
	$('#editSelectInputs').click(function(){
		toggleEditOption('inputs');
	});
	
	$('#editExplanation').click(function(){
		toggleEditOption('explanation');
	});
	
	$('#generateXML').click(function(){
		generateXML();
	});
	
	$('#saveXML').click(function(){
		var n = prompt('Enter password to save.');
		if ( n!=null && n!="" ) {
			saveXML(n);
		}
	});
	
	$('#doneQuestion').click(function(){
		updateQuestion(edit.mode);
		toggleEditOption('');
	});
	
	$('#previewQuestion').click(function(){
		updateQuestion(edit.mode);
	});
	
	$('#updateQuestion').click(function(){
		updateQuestion('landscape');
		updateQuestion('portrait');
	});
	
	//video
	$("#videoEmbed").change(function() {
		if($(this).val() != ''){
			checkVideoArray($(this).val());
			loadEditVideo();
		}
	});
	
	$('#removeVideoContainer').click(function(){
		actionVideo('removeContainer');
	});
	
	$("#videoslist").change(function() {
		if($(this).val() != ''){
			edit.videoNum = Number($(this).val());
			loadEditVideo();
		}
	});
	
	$('#prevVideo').click(function(){
		toggleVideo(false);
	});
	
	$('#nextVideo').click(function(){
		toggleVideo(true);
	});
	
	$('#removeVideo').click(function(){
		actionVideo('remove');
	});
	
	$('#addVideo').click(function(){
		actionVideo('add');
	});
	
	$('#doneVideo').click(function(){
		updateVideo(edit.mode);
		toggleEditOption('');
	});
	
	$('#previewVideo').click(function(){
		updateVideo(edit.mode);
	});
	
	//answer
	$("#draggable").change(function() {
		$('#toggleDrag').hide();
		$('#correctAnswerWrapper').show();
		
		if($(this).val() == 'true'){
			$('#toggleDrag').show();
			$('#correctAnswerWrapper').hide();
		}
	});
	
	$("#answerslist").change(function() {
		if($(this).val() != ''){
			edit.answerNum = Number($(this).val());
			loadEditAnswer();
		}
	});
	
	$('#prevAnswer').click(function(){
		toggleAnswer(false);
	});
	
	$('#nextAnswer').click(function(){
		toggleAnswer(true);
	});
	
	$('#removeAnswer').click(function(){
		actionAnswer('remove');
	});
	
	$('#sortAnswer').click(function(){
		toggleEditOption('sortAnswer');
	});
	
	$('#addAnswer').click(function(){
		actionAnswer('add');
	});
	
	$('#editDraggable').click(function(){
		toggleEditOption('drag');
	});
	
	$('#editDroppable').click(function(){
		toggleEditOption('drop');
	});
	
	$('#doneAnswerChoose').click(function(){
		toggleEditOption('');
	});
	
	$('#doneAnswer').click(function(){
		updateAnswers();
		toggleEditOption('');
	});
	
	$('#previewAnswer').click(function(){
		updateAnswers();
	});
	
	//input
	$("#inputslist").change(function() {
		if($(this).val() != ''){
			edit.inputNum = Number($(this).val());
			loadEditInput();
		}
	});
	
	$('#prevInput').click(function(){
		toggleInput(false);
	});
	
	$('#nextInput').click(function(){
		toggleInput(true);
	});
	
	$('#removeInput').click(function(){
		actionInput('remove');
	});
	
	$('#sortInput').click(function(){
		toggleEditOption('sortInput');
	});
	
	$('#addInput').click(function(){
		actionInput('add');
	});
	
	$('#doneInput').click(function(){
		updateInputs();
		toggleEditOption('');
	});
	
	$("#inputtype").change(function() {
		toggleInputCorrect($(this).val());
	});
	
	$('#previewInput').click(function(){
		updateInputs();
	});
	
	$("#inputSubmit").change(function() {
		toggleSubmitInput($(this).val());
	});
	
	//template
	$('#doneTemplate').click(function(){
		toggleEditOption('');
	});
	
	$('#addNewTemplate').click(function(){
		actionQuestion('add');
	});
	
	$("#templatelist").change(function() {
		if($(this).val() != gameData.templateNum){
			gameData.templateNum = $(this).val();
		}
	});
	
	//sort
	$('#moveQuestionUp').click(function(){
		swapQuestion(false);
	});
	
	$('#moveQuestionDown').click(function(){
		swapQuestion(true);
	});
	
	$('#doneSort').click(function(){
		toggleEditOption('');
	});
	
	$("#sortquestionslist").change(function() {
		if($(this).val() != ''){
			edit.sortNum = $(this).val();
		}
	});
	
	//sort answer
	$('#moveAnswerUp').click(function(){
		swapAnswer('answer',false);
	});
	
	$('#moveAnswerDown').click(function(){
		swapAnswer('answer',true);
	});
	
	$('#doneSortAnswer').click(function(){
		toggleEditOption('answers');
	});
	
	$("#sortanswerslist").change(function() {
		if($(this).val() != ''){
			edit.sortAnswerNum = $(this).val();
		}
	});
	
	//sort input
	$('#moveInputUp').click(function(){
		swapAnswer('input',false);
	});
	
	$('#moveInputDown').click(function(){
		swapAnswer('input',true);
	});
	
	$('#doneSortInput').click(function(){
		toggleEditOption('inputs');
	});
	
	$("#sortinputslist").change(function() {
		if($(this).val() != ''){
			edit.sortAnswerNum = $(this).val();
		}
	});
	
	//category
	$("#categorylist").change(function() {
		if($(this).val() != ''){
			edit.categoryNum = $(this).val();
			loadEditCategory();
		}
	});
	
	$('#addNewCategory').click(function(){
		actionCategory('add');
	});
	
	$('#removeCategory').click(function(){
		actionCategory('remove');
	});
	
	$('#updateCategory').click(function(){
		updateCategory();
	});
	
	$('#doneCategory').click(function(){
		updateCategory();
		toggleEditOption('');
	});
	
	//explanation
	$('#doneExplanation').click(function(){
		updateExplanation(edit.mode);
		toggleEditOption('');
	});
	
	$('#previewExplanation').click(function(){
		updateExplanation();
		playAudioLoop();
	});
}

/*!
 * 
 * TOGGLE DISPLAY OPTION - This is the function that runs to toggle display option
 * 
 */
 
function toggleShowOption(){
	if(edit.show){
		edit.show = false;
		$('#editOption').hide();
		$('#toggleShowOption').val('Show Edit Option');
	}else{
		edit.show = true;
		$('#editOption').show();
		$('#toggleShowOption').val('Hide Edit Option');
	}
}

function toggleEditOption(con){
	edit.con = con;
	
	$("html, body").animate({ scrollTop: 0 }, "fast");
	$('#actionWrapper').hide();
	$('#sortWrapper').hide();
	$('#sortAnswerWrapper').hide();
	$('#sortInputWrapper').hide();
	$('#templateWrapper').hide();
	$('#questionWrapper').hide();
	$('#videoWrapper').hide();
	$('#answersWrapper').hide();
	$('#selectAnswerWrapper').hide();
	$('#inputsWrapper').hide();
	$('#explanationWrapper').hide();
	$('#topWrapper').hide();
	$('#selectQuestionWrapper').hide();
	$('#questionHolder').show();
	$('#questionResultHolder').hide();
	$('#categoryWrapper').hide();
	$('#answerSection').hide();
	$('#dropSection').hide();
	
	if(con == 'sort'){
		$('#sortWrapper').show();
	}else if(con == 'sortAnswer'){
		$('#sortAnswerWrapper').show();
	}else if(con == 'sortInput'){
		$('#sortInputWrapper').show();
	}else if(con == 'selectAnswer'){
		$('#selectAnswerWrapper').show();
	}else if(con == 'template'){
		gameData.templateNum = -1;
		$('#templateWrapper').show();
	}else if(con == 'category'){
		$('#categoryWrapper').show();
		buildEditCategory();
	}else if(con == 'question'){
		$('#questionWrapper').show();
		$('#selectQuestionWrapper').show();
	}else if(con == 'video'){
		$('#videoWrapper').show();
	}else if(con == 'answers'){
		$('#answersWrapper').show();
		$('#answerSection').show();
	}else if(con == 'drag'){
		$('#answersWrapper').show();
		$('#answerSection').show();
	}else if(con == 'drop'){
		$('#answersWrapper').show();
		$('#dropSection').show();
	}else if(con == 'inputs'){
		$('#inputsWrapper').show();
	}else if(con == 'explanation'){
		$('#explanationWrapper').show();
		$('#questionHolder').hide();
		$('#questionResultHolder').show();
		playAudioLoop();
	}else{
		$('#actionWrapper').show();	
		$('#topWrapper').show();
		$('#selectQuestionWrapper').show();
	}
	
	setBorderFocus();
	loadEditQuestion(false);
}


/*!
 * 
 * TOGGLE QUESTION - This is the function that runs to toggle question
 * 
 */
function toggleQuestion(con){
	gameData.questionNum = Number(gameData.questionNum);
	
	if(con){
		gameData.questionNum++;
		gameData.questionNum = gameData.questionNum > gameData.targetArray.length - 1 ? 0 : gameData.questionNum;
	}else{
		gameData.questionNum--;
		gameData.questionNum = gameData.questionNum < 0 ? gameData.targetArray.length - 1 : gameData.questionNum;
	}
	
	gameData.sequenceNum = gameData.sequence_arr[gameData.questionNum];
	$('#questionslist').prop("selectedIndex", gameData.sequenceNum);
	
	edit.answerNum = 0;
	edit.inputNum = 0;
	edit.videoNum = 0;
	loadEditQuestion(true);
}

/*!
 * 
 * TOGGLE ANSWER - This is the function that runs to toggle answer
 * 
 */
function toggleAnswer(con){
	if(con){
		edit.answerNum++;
		edit.answerNum = edit.answerNum > gameData.targetArray[gameData.sequenceNum].answer.length - 1 ? 0 : edit.answerNum;
	}else{
		edit.answerNum--;
		edit.answerNum = edit.answerNum < 0 ? gameData.targetArray[gameData.sequenceNum].answer.length - 1 : edit.answerNum;
	}
	
	$('#answerslist').prop("selectedIndex", edit.answerNum);
	loadEditAnswer();
}

/*!
 * 
 * TOGGLE INPUT - This is the function that runs to toggle input
 * 
 */
function toggleInput(con){
	if(con){
		edit.inputNum++;
		edit.inputNum = edit.inputNum > gameData.targetArray[gameData.sequenceNum].input.length - 1 ? 0 : edit.inputNum;
	}else{
		edit.inputNum--;
		edit.inputNum = edit.inputNum < 0 ? gameData.targetArray[gameData.sequenceNum].input.length - 1 : edit.inputNum;
	}
	
	$('#inputslist').prop("selectedIndex", edit.inputNum);
	loadEditInput();
}

/*!
 * 
 * TOGGLE ANSWER - This is the function that runs to toggle answer
 * 
 */
function toggleVideo(con){
	if(con){
		edit.videoNum++;
		edit.videoNum = edit.videoNum > gameData.targetArray[gameData.sequenceNum].videos[0].types.length - 1 ? 0 : edit.videoNum;
	}else{
		edit.videoNum--;
		edit.videoNum = edit.videoNum < 0 ? gameData.targetArray[gameData.sequenceNum].videos[0].types.length - 1 : edit.videoNum;
	}
	
	$('#videoslist').prop("selectedIndex", edit.videoNum);
	loadEditVideo();
}

/*!
 * 
 * ACTION ANSWER - This is the function that runs to add/remove answer
 * 
 */
function actionAnswer(con){
	if(con == 'add'){
		if(gameData.targetArray[gameData.sequenceNum].answer.length < 8){
			var newAnswerText = 'Answer'+(gameData.targetArray[gameData.sequenceNum].answer.length+1);
			gameData.targetArray[gameData.sequenceNum].answer.push({text:newAnswerText,
																	type:'text',
																	width:'',
																	height:'',
																	top:'',
																	left:'',
																	fontSize:'',
																	lineHeight:'',
																	color:'',
																	align:'center',
																	audio:'',
																	offsetTop:'',
																	submit:false,
																	
																	dropEnable:true,
																	dropLabelText:'',
																	dropLabelType:'text',
																	dropLabelWidth:'',
																	dropLabelHeight:'',
																	dropLabelTop:'',
																	dropLabelLeft:'',
																	dropLabelFontSize:'',
																	dropLabelLineHeight:'',
																	dropLabelColor:'',
																	dropLabelAlign:'center',
																	dropLabelOffsetTop:'',
																	
																	dropWidth:'',
																	dropHeight:'',
																	dropTop:'',
																	dropLeft:'',
																	dropOffTop:'',
																	dropOffLeft:''
																	});
																	
			$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers').append('<answer type="text">'+newAnswerText+'</answer>');
			
			$('#answerSubmit').prop("selectedIndex", 1);
			$('#answertype').prop("selectedIndex", 0);
			$('#answerText').val(newAnswerText);
			
			$('.resetAnswer').val('');
			$('#answerAlign').prop("selectedIndex", 1);
			
			$('#dropEnable').prop("selectedIndex", 0);
			$('#dropLabelType').prop("selectedIndex", 0);
			$('#dropLabelAlign').prop("selectedIndex", 2);
			
			edit.answerNum = gameData.targetArray[gameData.sequenceNum].answer.length-1;
			updateAnswers();
		}else{
			alert('Maximum 8 answers!');	
		}
	}else{
		gameData.targetArray[gameData.sequenceNum].answer.splice(edit.answerNum, 1);
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).remove();
		
		edit.answerNum = 0;
		loadEditQuestion(false);	
	}
}

/*!
 * 
 * ACTION INPUT - This is the function that runs to add/remove input
 * 
 */
function actionInput(con){
	if(con == 'add'){
		if(gameData.targetArray[gameData.sequenceNum].input.length < 8){
			gameData.targetArray[gameData.sequenceNum].input.push({text:'',
																	type:'blank',
																	width:'',
																	height:'',
																	top:'',
																	left:'',
																	fontSize:'',
																	lineHeight:'',
																	color:'',
																	align:'center',
																	audio:'',
																	offsetTop:'',
																	correctAnswer:'',
																	bacgkround:'',});
																	
			$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs').append('<input type="blank"></input>');
			
			$('#inputSubmit').prop("selectedIndex", 1);
			$('#inputtype').prop("selectedIndex", 0);
			
			$('.resetInput').val('');
			$('#inputAlign').prop("selectedIndex", 1);
			
			edit.inputNum = gameData.targetArray[gameData.sequenceNum].input.length-1;
			updateInputs();
		}else{
			alert('Maximum 8 answers!');	
		}
	}else{
		gameData.targetArray[gameData.sequenceNum].input.splice(edit.answerNum, 1);
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).remove();
		
		edit.inputNum = 0;
		loadEditQuestion(false);	
	}
}

/*!
 * 
 * ACTION VIDEO - This is the function that runs to add/remove video
 * 
 */
function actionVideo(con){
	if(con == 'add'){
		if(gameData.targetArray[gameData.sequenceNum].videos[0] == undefined){
			gameData.targetArray[gameData.sequenceNum].videos = [];
			gameData.targetArray[gameData.sequenceNum].videos.push({
																	width:'',
																	height:'',
																	top:'',
																	left:'',
																	autoplay:true,
																	controls:true,
																	embed:'html',
																	types:[]
																})
		}
		
		gameData.targetArray[gameData.sequenceNum].videos[0].types.push({
																	src:'',
																	type:'video/mp4'
																});
																
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos').append('<video></video>');
		$('#videoSrc').val('');
		$('#youtubeSrc').val('');
		
		edit.videoNum = gameData.targetArray[gameData.sequenceNum].videos[0].types.length-1;
		updateVideo();
	}else if(con == 'remove'){
		gameData.targetArray[gameData.sequenceNum].videos[0].types.splice(edit.videoNum, 1);
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos video').eq(edit.videoNum).remove();
		
		edit.videoNum = 0;
		loadEditQuestion(false);	
	}else{
		gameData.targetArray[gameData.sequenceNum].videos[0] = undefined;
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos').eq(0).remove();
		
		edit.videoNum = 0;
		loadEditQuestion(false);	
	}
}

/*!
 * 
 * ACTION QUESTION - This is the function that runs to add/remove quesiton
 * 
 */
function actionQuestion(con){
	if(con == 'add'){
		if(gameData.templateNum == -1){
			alert('Please select a template to add');
			return;	
		}
		toggleEditOption('');
		
		var newTemplate = $(edit.templateFile).find('item').eq(gameData.templateNum).clone();
		$(edit.xmlFile).find('questions').append(newTemplate);
		
		var lastArrayNum = gameData.targetArray.length;
		$(edit.xmlFile).find('item').each(function(questionIndex, questionElement){
			if(lastArrayNum == questionIndex){
				pushDataArray(questionIndex, questionElement);
			}
		});
		
		filterCategoryQuestion();
		gameData.questionNum = gameData.targetArray.length-1;
	}else{
		filterCategoryQuestion();
		quesLandscape_arr.splice(gameData.sequenceNum, 1);
		quesPortrait_arr.splice(gameData.sequenceNum, 1);
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).remove();
		
		gameData.questionNum = 0;
	}
	
	gameData.sequenceNum = gameData.sequence_arr[gameData.questionNum];
	filterCategoryQuestion();
	buildQuestionList();
	loadEditQuestion(false);
}

/*!
 * 
 * LOAD EDIT QUESTION - This is the function that runs to load question value
 * 
 */
function loadEditQuestion(con){
	$('#editWrapper').show();
	$('#youtubeTypeWrapper').hide();
	$('#removeVideoContainer').hide();
		
	buildEditCategory();
	
	//edit question
	$('#category').val(gameData.targetArray[gameData.sequenceNum].category);
	
	var questionType = gameData.targetArray[gameData.sequenceNum].type == 'text' ? 0 : 1;
	var questionAlign = getEditAlign(gameData.targetArray[gameData.sequenceNum].align);
	
	$('#questiontype').prop("selectedIndex", questionType);
	$('#questionText').val(gameData.targetArray[gameData.sequenceNum].question);
	$('#questionFontSize').val(gameData.targetArray[gameData.sequenceNum].fontSize);
	$('#questionLineHeight').val(gameData.targetArray[gameData.sequenceNum].lineHeight);
	$('#questionAlign').prop("selectedIndex", questionAlign);
	$('#questionTop').val(gameData.targetArray[gameData.sequenceNum].top);
	$('#questionLeft').val(gameData.targetArray[gameData.sequenceNum].left);
	$('#questionWidth').val(gameData.targetArray[gameData.sequenceNum].width);
	$('#questionHeight').val(gameData.targetArray[gameData.sequenceNum].height);
	$('#questionColor').val(gameData.targetArray[gameData.sequenceNum].color);
	$('#questionAudio').val(gameData.targetArray[gameData.sequenceNum].audio);
	
	//edit video
	if(gameData.targetArray[gameData.sequenceNum].videos[0] != undefined){
		$('#videoslist').empty();
		for(n=0;n<gameData.targetArray[gameData.sequenceNum].videos[0].types.length;n++){
			$('#videoslist').append($("<option/>", {
				value: n,
				text: 'Video Type '+(n+1)+' : ('+gameData.targetArray[gameData.sequenceNum].videos[0].types[n].type+')'
			}));
		}
		$('#videoslist').prop("selectedIndex", edit.videoNum);
		loadEditVideo();
	}else{
		$('#videoslist').empty();
		$('#videoSrc').val('');	
		$('#youtubeSrc').val('');
	}
	
	//edit answers
	$('#answerslist').empty();
	$('#sortanswerslist').empty();
	for(n=0;n<gameData.targetArray[gameData.sequenceNum].answer.length;n++){
		$('#answerslist').append($("<option/>", {
			value: n,
			text: 'Answer '+(n+1)+' :  ('+gameData.targetArray[gameData.sequenceNum].answer[n].text+')'
		}));
		$('#sortanswerslist').append($("<option/>", {
			value: n,
			text: gameData.targetArray[gameData.sequenceNum].answer[n].text
		}));
	}
	$('#answerslist').prop("selectedIndex", edit.answerNum);
	loadEditAnswer();
	
	//edit inputs
	$('#inputslist').empty();
	$('#sortinputslist').empty();
	for(n=0;n<gameData.targetArray[gameData.sequenceNum].input.length;n++){
		$('#inputslist').append($("<option/>", {
			value: n,
			text: 'Input '+(n+1)
		}));
		$('#sortinputslist').append($("<option/>", {
			value: n,
			text: gameData.targetArray[gameData.sequenceNum].input[n].text
		}));
	}
	$('#inputslist').prop("selectedIndex", edit.inputNum);
	loadEditInput();
	
	loadEditExplanation();
	
	edit.replay = con;
	loadQuestion();
	setBorderFocus();
}

/*!
 * 
 * LOAD EDIT ANSWER - This is the function that runs to load answer value
 * 
 */
function checkVideoArray(embed){
	actionVideo('removeContainer');
	if(gameData.targetArray[gameData.sequenceNum].videos[0] == undefined){
		actionVideo('add');
	}
	
	gameData.targetArray[gameData.sequenceNum].videos[0].embed = embed;
	edit.videoNum = 0;
}
 
function loadEditVideo(){
	if(gameData.targetArray[gameData.sequenceNum].videos[0] != undefined){
		$('#removeVideoContainer').show();	
	}
	
	if(gameData.targetArray[gameData.sequenceNum].videos[0] == undefined){
		$('.resetVideo').val('');
		$('#videoAutoplay').prop("selectedIndex", 0);
		$('#videoControls').prop("selectedIndex", 0);
		return;	
	}
	
	if(gameData.targetArray[gameData.sequenceNum].videos[0].types == undefined){
		$('.resetVideo').val('');
		$('#videoAutoplay').prop("selectedIndex", 0);
		$('#videoControls').prop("selectedIndex", 0);
		return;		
	}
	
	if(gameData.targetArray[gameData.sequenceNum].videos[0].types.length <= 0){
		$('.resetVideo').val('');
		$('#videoAutoplay').prop("selectedIndex", 0);
		$('#videoControls').prop("selectedIndex", 0);
		return;	
	}
	
	var videoEmbed = gameData.targetArray[gameData.sequenceNum].videos[0].embed == undefined ? 'html' : gameData.targetArray[gameData.sequenceNum].videos[0].embed;
	
	$('#videoTypeWrapper, #youtubeTypeWrapper').hide();
	
	if(videoEmbed == 'html'){
		$('#videoTypeWrapper').show();
		$('#videoAutoplayField').show();
		$('#videoControlsField').show();
	}else{
		$('#youtubeTypeWrapper').show();
		$('#videoAutoplayField').hide();
		$('#videoControlsField').hide();	
	}
	
	var videoAutoplay = getEditBoolean(gameData.targetArray[gameData.sequenceNum].videos[0].autoplay);
	var videoControls = getEditBoolean(gameData.targetArray[gameData.sequenceNum].videos[0].controls);
	var videoType = gameData.targetArray[gameData.sequenceNum].videos[0].types[edit.videoNum].type;
	
	if(videoType == undefined){
		videoType = 0;
	}else{
		if(videoType == 'video/mp4'){
			videoType = 0;	
		}else if(videoType == 'video/webm'){
			videoType = 1;
		}else if(videoType == 'video/ogg'){
			videoType = 2;
		}
	}
	
	$('#videotype').prop("selectedIndex", videoType);
	if($('#videoEmbed').val() == 'youtube'){
		$('#youtubeSrc').val(gameData.targetArray[gameData.sequenceNum].videos[0].types[edit.videoNum].src);
	}else{
		$('#videoSrc').val(gameData.targetArray[gameData.sequenceNum].videos[0].types[edit.videoNum].src);	
	}
	$('#videoWidth').val(gameData.targetArray[gameData.sequenceNum].videos[0].width);
	$('#videoHeight').val(gameData.targetArray[gameData.sequenceNum].videos[0].height);
	$('#videoTop').val(gameData.targetArray[gameData.sequenceNum].videos[0].top);
	$('#videoLeft').val(gameData.targetArray[gameData.sequenceNum].videos[0].left);
	$('#videoEmbed').val(videoEmbed);
	$('#videoAutoplay').prop("selectedIndex", videoAutoplay);
	$('#videoControls').prop("selectedIndex", videoControls);
}

/*!
 * 
 * LOAD EDIT ANSWER - This is the function that runs to load answer value
 * 
 */
function loadEditAnswer(){
	$('#toggleDrag').hide();
	$('#correctAnswerWrapper').show();
	
	if(gameData.targetArray[gameData.sequenceNum].answer.length <= 0){
		$('#answerslist').empty();
		$('.resetAnswer').val('');
		$('#draggable').prop("selectedIndex", 1);
		$('#answerAlign').prop("selectedIndex", 0);
		$('#dropLabelAlign').prop("selectedIndex", 0);
		return;	
	}
	
	$('#correctAnswer').val(gameData.targetArray[gameData.sequenceNum].correctAnswer);
	var dragType = gameData.targetArray[gameData.sequenceNum].drag == 'true' ? 0 : 1;
	$('#draggable').prop("selectedIndex", dragType);
	if(dragType == 0){
		$('#toggleDrag').show();
		$('#correctAnswerWrapper').hide();
	}
	
	var answerSubmit = 0;
	if(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].submit == 'false' || gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].submit == undefined){
		answerSubmit = 1;
	}else{
		answerSubmit = 0;
	}
	
	$('#answerSubmit').prop("selectedIndex", answerSubmit);
	
	var answerType = gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].type == 'image' ? 1 : 0;
	$('#answertype').prop("selectedIndex", answerType);
	
	var answerAlign = getEditAlign(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].align);
	
	$('#answerText').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].text);
	$('#answerFontSize').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].fontSize);
	$('#answerLineHeight').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].lineHeight);
	$('#answerOffsetTop').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].offsetTop);
	$('#answerWidth').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].width);
	$('#answerHeight').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].height);
	$('#answerTop').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].top);
	$('#answerLeft').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].left);
	$('#answerColor').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].color);
	$('#answerAlign').prop("selectedIndex", answerAlign);
	
	if(dragType == 0){
		//drop label
		var dropEnable = gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropEnable == 'false' ? 1 : 0;
		$('#dropEnable').prop("selectedIndex", dropEnable);
		
		var dropLabelType = gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropLabelType == 'image' ? 1 : 0;
		$('#dropLabelType').prop("selectedIndex", dropLabelType);
		
		var dropLabelAlign = getEditAlign(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropLabelAlign);
		
		$('#dropLabelText').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropLabelText);
		$('#dropLabelFontSize').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropLabelFontSize);
		$('#dropLabelLineHeight').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropLabelLineHeight);
		$('#dropLabelOffsetTop').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropLabelOffsetTop);
		$('#dropLabelWidth').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropLabelWidth);
		$('#dropLabelHeight').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropLabelHeight);
		$('#dropLabelTop').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropLabelTop);
		$('#dropLabelLeft').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropLabelLeft);
		$('#dropLabelColor').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropLabelColor);
		$('#dropLabelAlign').prop("selectedIndex", dropLabelAlign);
		
		//drop area
		$('#dropWidth').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropWidth);
		$('#dropHeight').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropHeight);
		$('#dropTop').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropTop);
		$('#dropLeft').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropLeft);
		$('#dropOffTop').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropOffTop);
		$('#dropOffLeft').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropOffLeft);
	}
	
	$('#answerAudio').val(gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].audio);
	
	setBorderFocus();
}

/*!
 * 
 * LOAD EDIT INPUT - This is the function that runs to load input value
 * 
 */
function loadEditInput(){
	if(gameData.targetArray[gameData.sequenceNum].input.length <= 0){
		$('#inputSubmit').prop("selectedIndex", 1);
		$('#inputtype').prop("selectedIndex", 0);
		$('.resetInput').val('');
		$('#inputAlign').prop("selectedIndex", 0);
		return;	
	}
	
	var inputSubmit = 0;
	if(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].submit == 'false' || gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].submit == undefined){
		inputSubmit = 1;
	}else{
		inputSubmit = 0;
	}
	
	$('#inputSubmit').prop("selectedIndex", inputSubmit);
	toggleSubmitInput(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].submit)
	
	var inputType = 0;
	if(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].type == 'blank'){
		inputType = 0;
	}else if(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].type == 'text'){
		inputType = 1;
	}else if(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].type == 'image'){
		inputType = 2;
	}
	
	$('#inputtype').prop("selectedIndex", inputType);
	
	var inputAlign = getEditAlign(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].align);
	toggleInputCorrect(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].type);
	
	$('#correctInput').val(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].correctAnswer);
	$('#inputText').val(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].text);
	$('#inputFontSize').val(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].fontSize);
	$('#inputLineHeight').val(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].lineHeight);
	$('#inputWidth').val(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].width);
	$('#inputHeight').val(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].height);
	$('#inputTop').val(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].top);
	$('#inputLeft').val(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].left);
	$('#inputColor').val(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].color);
	$('#inputBackground').val(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].background);
	$('#inputAlign').prop("selectedIndex", inputAlign);
	$('#inputAudio').val(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].audio);
	$('#inputOffsetTop').val(gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].offsetTop);
	
	setBorderFocus();
}

function toggleSubmitInput(inputSubmit){
	$('#inputtype option[value="blank"]').attr("disabled", true);
	$('#inputtype option[value="text"]').attr("disabled", true);
	$('#inputtype option[value="image"]').attr("disabled", true);
	
	if(inputSubmit == 'true'){
		$('#inputtype').prop("selectedIndex", 1);
		$('#inputtype option[value="text"]').removeAttr('disabled');
		$('#inputtype option[value="image"]').removeAttr('disabled');
	}else{
		$('#inputtype').prop("selectedIndex", 0);
		$('#inputtype option[value="blank"]').removeAttr('disabled');
	}	
}

function toggleInputCorrect(inputType){
	if(inputType == 'blank'){
		$('#correctInputWrapper').show();
	}else{
		$('#correctInputWrapper').hide();
	}
}

/*!
 * 
 * LOAD EDIT EXPLANATION - This is the function that runs to load explanation value
 * 
 */
function loadEditExplanation(){
	var explainType = gameData.targetArray[gameData.sequenceNum].explanationType == 'image' ? 1 : 0;
	$('#explanationtype').prop("selectedIndex", explainType);
	
	var explanationAlign = getEditAlign(gameData.targetArray[gameData.sequenceNum].explanationAlign);
	$('#explanationText').val(gameData.targetArray[gameData.sequenceNum].explanation);
	$('#explanationFontSize').val(gameData.targetArray[gameData.sequenceNum].explanationFontSize);
	$('#explanationLineHeight').val(gameData.targetArray[gameData.sequenceNum].explanationLineHeight);
	$('#explanationWidth').val(gameData.targetArray[gameData.sequenceNum].explanationWidth);
	$('#explanationHeight').val(gameData.targetArray[gameData.sequenceNum].explanationHeight);
	$('#explanationTop').val(gameData.targetArray[gameData.sequenceNum].explanationTop);
	$('#explanationLeft').val(gameData.targetArray[gameData.sequenceNum].explanationLeft);
	$('#explanationColor').val(gameData.targetArray[gameData.sequenceNum].explanationColor);
	$('#explanationAlign').prop("selectedIndex", explanationAlign);
	$('#explanationAudio').val(gameData.targetArray[gameData.sequenceNum].explanationAudio);
}

/*!
 * 
 * UPDATE QUESTION - This is the function that runs to update question value
 * 
 */
function updateQuestion(){
	//update array
	quesLandscape_arr[gameData.sequenceNum].category = $('#category').val();
	quesPortrait_arr[gameData.sequenceNum].category = $('#category').val();
	
	var questionFontSize = $('#questionFontSize').val();
	questionFontSize = questionFontSize == 0 ? undefined : questionFontSize;
	var questionLineHeight = $('#questionLineHeight').val();
	questionLineHeight = questionLineHeight == 0 ? undefined : questionLineHeight;
	var questionTop = $('#questionTop').val();
	questionTop = questionTop == 0 ? undefined : questionTop;
	var questionLeft = $('#questionLeft').val();
	questionLeft = questionLeft == 0 ? undefined : questionLeft;
	var questionWidth = $('#questionWidth').val();
	questionWidth = questionWidth == 0 ? undefined : questionWidth;
	var questionHeight = $('#questionHeight').val();
	questionHeight = questionHeight == 0 ? undefined : questionHeight;
	
	gameData.targetArray[gameData.sequenceNum].type = $('#questiontype').val();
	gameData.targetArray[gameData.sequenceNum].fontSize = questionFontSize;
	gameData.targetArray[gameData.sequenceNum].lineHeight = questionLineHeight;
	gameData.targetArray[gameData.sequenceNum].align = $('#questionAlign').val();
	gameData.targetArray[gameData.sequenceNum].top = questionTop;
	gameData.targetArray[gameData.sequenceNum].left = questionLeft;
	gameData.targetArray[gameData.sequenceNum].width = questionWidth;
	gameData.targetArray[gameData.sequenceNum].height = questionHeight;
	gameData.targetArray[gameData.sequenceNum].question = $('#questionText').val();
	gameData.targetArray[gameData.sequenceNum].color = $('#questionColor').val();
	gameData.targetArray[gameData.sequenceNum].audio = $('#questionAudio').val();
	
	//update XML
	$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find('category').text($('#category').val());
	$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('question').attr('type', $('#questiontype').val());
	
	if($('#questiontype').val() == 'text'){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('question').html('<![CDATA['+$('#questionText').val()+']]>');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('question').html($('#questionText').val());
	}
	
	updateXMLFirst('question','fontSize',questionFontSize, true);
	updateXMLFirst('question','lineHeight',questionLineHeight, true);
	updateXMLFirst('question','top',questionTop, true);
	updateXMLFirst('question','left',questionLeft, true);
	updateXMLFirst('question','width',questionWidth, true);
	updateXMLFirst('question','height',questionHeight, true);
	updateXMLFirst('question','align',$('#questionAlign').val());
	updateXMLFirst('question','audio',$('#questionAudio').val());
	updateXMLFirst('question','color',$('#questionColor').val());
	
	loadEditQuestion(true);
}

/*!
 * 
 * UPDATE VIDEO - This is the function that runs to update video value
 * 
 */
function updateVideo(){
	if(gameData.targetArray[gameData.sequenceNum].videos[0] == undefined){
		return;	
	}
	
	if(gameData.targetArray[gameData.sequenceNum].videos[0].types.length <= 0){
		return;	
	}
	
	//update array
	var videoWidth = $('#videoWidth').val();
	videoWidth = videoWidth == 0 ? undefined : videoWidth;
	var videoHeight = $('#videoHeight').val();
	videoHeight = videoHeight == 0 ? undefined : videoHeight;
	var videoTop = $('#videoTop').val();
	videoTop = videoTop == 0 ? undefined : videoTop;
	var videoLeft = $('#videoLeft').val();
	videoLeft = videoLeft == 0 ? undefined : videoLeft;
	
	gameData.targetArray[gameData.sequenceNum].videos[0].width = videoWidth;
	gameData.targetArray[gameData.sequenceNum].videos[0].height = videoHeight;
	gameData.targetArray[gameData.sequenceNum].videos[0].top = videoTop;
	gameData.targetArray[gameData.sequenceNum].videos[0].left = videoLeft;
	gameData.targetArray[gameData.sequenceNum].videos[0].autoplay = $('#videoAutoplay').val();
	gameData.targetArray[gameData.sequenceNum].videos[0].controls = $('#videoControls').val();
	gameData.targetArray[gameData.sequenceNum].videos[0].embed = $('#videoEmbed').val();
	
	if(gameData.targetArray[gameData.sequenceNum].videos[0].types.length > 0){
		if($('#videoEmbed').val() == 'youtube'){
			gameData.targetArray[gameData.sequenceNum].videos[0].types[edit.videoNum].src = $('#youtubeSrc').val();
			gameData.targetArray[gameData.sequenceNum].videos[0].types[edit.videoNum].type = 'youtube';
		}else{
			gameData.targetArray[gameData.sequenceNum].videos[0].types[edit.videoNum].src = $('#videoSrc').val();
			gameData.targetArray[gameData.sequenceNum].videos[0].types[edit.videoNum].type = $('#videotype').val();
		}
	}
	
	//update XML
	if($(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos').length == 0){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).append('<videos/>');	
	}
	
	if($(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos video').length == 0){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos').append('<video/>');	
	}
	
	if(gameData.targetArray[gameData.sequenceNum].videos[0].types.length > 0){
		if($('#videoEmbed').val() == 'youtube'){
			$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos video').eq(edit.videoNum).html('<![CDATA['+$('#youtubeSrc').val()+']]>');
			$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos video').eq(edit.videoNum).attr('type', 'youtube');
		}else{
			$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos video').eq(edit.videoNum).html($('#videoSrc').val());
			$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos video').eq(edit.videoNum).attr('type', $('#videotype').val());
		}
	}
	
	updateXMLChild('videos','left',videoLeft, true);
	updateXMLChild('videos','top',videoTop, true);
	updateXMLChild('videos','width',videoWidth, true);
	updateXMLChild('videos','height',videoHeight, true);
	
	$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos').eq(0).attr('autoplay', $('#videoAutoplay').val());
	$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos').eq(0).attr('controls', $('#videoControls').val());
	$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos').eq(0).attr('embed', $('#videoEmbed').val());
	
	loadEditQuestion(true);
}

/*!
 * 
 * UPDATE ANSWERS - This is the function that runs to update answers value
 * 
 */
function updateAnswers(){
	if(gameData.targetArray[gameData.sequenceNum].answer.length <= 0){
		return;	
	}
	
	//update array
	gameData.targetArray[gameData.sequenceNum].correctAnswer = $('#correctAnswer').val();
	gameData.targetArray[gameData.sequenceNum].drag = $('#draggable').val();
	
	var answerFontSize = $('#answerFontSize').val();
	answerFontSize = answerFontSize == 0 ? undefined : answerFontSize;
	var answerLineHeight = $('#answerLineHeight').val();
	answerLineHeight = answerLineHeight == 0 ? undefined : answerLineHeight;
	var answerWidth = $('#answerWidth').val();
	answerWidth = answerWidth == 0 ? undefined : answerWidth;
	var answerHeight = $('#answerHeight').val();
	answerHeight = answerHeight == 0 ? undefined : answerHeight;
	var answerTop = $('#answerTop').val();
	answerTop = answerTop == 0 ? undefined : answerTop;
	var answerLeft = $('#answerLeft').val();
	answerLeft = answerLeft == 0 ? undefined : answerLeft;
	var answerOffsetTop = $('#answerOffsetTop').val();
	answerOffsetTop = answerOffsetTop == 0 ? undefined : answerOffsetTop;
	
	var dropLabelFontSize = $('#dropLabelFontSize').val();
	dropLabelFontSize = dropLabelFontSize == 0 ? undefined : dropLabelFontSize;
	var dropLabelLineHeight = $('#dropLabelLineHeight').val();
	dropLabelLineHeight = dropLabelLineHeight == 0 ? undefined : dropLabelLineHeight;
	var dropLabelWidth = $('#dropLabelWidth').val();
	dropLabelWidth = dropLabelWidth == 0 ? undefined : dropLabelWidth;
	var dropLabelHeight = $('#dropLabelHeight').val();
	dropLabelHeight = dropLabelHeight == 0 ? undefined : dropLabelHeight;
	var dropLabelTop = $('#dropLabelTop').val();
	dropLabelTop = dropLabelTop == 0 ? undefined : dropLabelTop;
	var dropLabelLeft = $('#dropLabelLeft').val();
	dropLabelLeft = dropLabelLeft == 0 ? undefined : dropLabelLeft;
	var dropLabelOffsetTop = $('#dropLabelOffsetTop').val();
	dropLabelOffsetTop = dropLabelOffsetTop == 0 ? undefined : dropLabelOffsetTop;
	
	var dropWidth = $('#dropWidth').val();
	dropWidth = dropWidth == 0 ? undefined : dropWidth;
	var dropHeight = $('#dropHeight').val();
	dropHeight = dropHeight == 0 ? undefined : dropHeight;
	var dropTop = $('#dropTop').val();
	dropTop = dropTop == 0 ? undefined : dropTop;
	var dropLeft = $('#dropLeft').val();
	dropLeft = dropLeft == 0 ? undefined : dropLeft;
	var dropOffTop = $('#dropOffTop').val();
	dropOffTop = dropOffTop == 0 ? undefined : dropOffTop;
	var dropOffLeft = $('#dropOffLeft').val();
	dropOffLeft = dropOffLeft == 0 ? undefined : dropOffLeft;
	
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].submit = $('#answerSubmit').val();
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].type = $('#answertype').val();
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].text = $('#answerText').val();
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].fontSize = answerFontSize;
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].lineHeight = answerLineHeight;
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].align = $('#answerAlign').val();
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].width = answerWidth;
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].height = answerHeight;
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].top = answerTop;
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].left = answerLeft;
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].audio = $('#answerAudio').val();
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].color = $('#answerColor').val();
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].offsetTop = answerOffsetTop;
	
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropEnable = $('#dropEnable').val();
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropLabelType = $('#dropLabelType').val();
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropLabelText = $('#dropLabelText').val();
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropLabelFontSize = dropLabelFontSize;
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropLabelLineHeight = dropLabelLineHeight;
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropLabelAlign = $('#dropLabelAlign').val();
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropLabelWidth = dropLabelWidth;
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropLabelHeight = dropLabelHeight;
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropLabelTop = dropLabelTop;
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropLabelLeft = dropLabelLeft;
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropLabelColor = $('#dropLabelColor').val();
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropLabelOffsetTop = dropLabelOffsetTop;
	
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropWidth = dropWidth;
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropHeight = dropHeight;
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropTop = dropTop;
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropLeft = dropLeft;
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropOffTop = dropOffTop;
	gameData.targetArray[gameData.sequenceNum].answer[edit.answerNum].dropOffLeft = dropOffLeft;
	
	//update XML
	if($(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers').length == 0){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).append('<answers/>');	
	}
	
	if($(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').length == 0){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers').append('<answer/>');	
	}
	
	$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers').attr('correctAnswer', $('#correctAnswer').val());
	$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers').attr('drag', $('#draggable').val());
	
	if($('#answerSubmit').val() == 'true'){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).attr('submit', $('#answerSubmit').val());
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).removeAttr('submit');
	}
	
	$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).attr('type', $('#answertype').val());
	if($('#answertype').val() == 'text'){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).html('<![CDATA['+$('#answerText').val()+']]>');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).html($('#answerText').val());
	}
	
	updateXMLChild('answers answer','fontSize',answerFontSize, true);
	updateXMLChild('answers answer','lineHeight',answerLineHeight, true);
	updateXMLChild('answers answer','left',answerLeft, true);
	updateXMLChild('answers answer','top',answerTop, true);
	updateXMLChild('answers answer','width',answerWidth, true);
	updateXMLChild('answers answer','height',answerHeight, true);
	updateXMLChild('answers answer','align',answerAlign);
	updateXMLChild('answers answer','audio',$('#answerAudio').val());
	updateXMLChild('answers answer','color',$('#answerColor').val());
	updateXMLChild('answers answer','offsetTop',answerOffsetTop, true);
	
	//drop label
	$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).attr('dropEnable', $('#dropEnable').val());
	
	$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).attr('dropLabelType', $('#dropLabelType').val());
	
	if($('#dropLabelText').val() == ''){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).removeAttr('dropLabelText');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('answers answer').eq(edit.answerNum).attr('dropLabelText', $('#dropLabelText').val());
	}
	
	updateXMLChild('answers answer','dropLabelFontSize',dropLabelFontSize, true);
	updateXMLChild('answers answer','dropLabelLineHeight',dropLabelLineHeight, true);
	updateXMLChild('answers answer','dropLabelLeft',dropLabelLeft, true);
	updateXMLChild('answers answer','dropLabelTop',dropLabelTop, true);
	updateXMLChild('answers answer','dropLabelWidth',dropLabelWidth, true);
	updateXMLChild('answers answer','dropLabelHeight',dropLabelHeight, true);
	updateXMLChild('answers answer','dropLabelAlign',$('#dropLabelAlign').val());
	updateXMLChild('answers answer','dropLabelColor',$('#dropLabelColor').val());
	updateXMLChild('answers answer','dropLabelOffsetTop',dropLabelOffsetTop, true);
	
	//drop area
	updateXMLChild('answers answer','dropLeft',dropLeft, true);
	updateXMLChild('answers answer','dropTop',dropTop, true);
	updateXMLChild('answers answer','dropWidth',dropWidth, true);
	updateXMLChild('answers answer','dropHeight',dropHeight, true);
	updateXMLChild('answers answer','dropOffLeft',dropOffLeft, true);
	updateXMLChild('answers answer','dropOffTop',dropOffTop, true);
	
	loadEditQuestion(true);
}

/*!
 * 
 * UPDATE INPUTS - This is the function that runs to update inputs value
 * 
 */
function updateInputs(){
	if(gameData.targetArray[gameData.sequenceNum].input.length <= 0){
		return;	
	}
	
	//update array
	var inputFontSize = $('#inputFontSize').val();
	inputFontSize = inputFontSize == 0 ? undefined : inputFontSize;
	var inputLineHeight = $('#inputLineHeight').val();
	inputLineHeight = inputLineHeight == 0 ? undefined : inputLineHeight;
	var inputWidth = $('#inputWidth').val();
	inputWidth = inputWidth == 0 ? undefined : inputWidth;
	var inputHeight = $('#inputHeight').val();
	inputHeight = inputHeight == 0 ? undefined : inputHeight;
	var inputTop = $('#inputTop').val();
	inputTop = inputTop == 0 ? undefined : inputTop;
	var inputLeft = $('#inputLeft').val();
	inputLeft = inputLeft == 0 ? undefined : inputLeft;
	var inputOffsetTop = $('#inputOffsetTop').val();
	inputOffsetTop = inputOffsetTop == 0 ? undefined : inputOffsetTop;
	
	gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].correctAnswer = $('#correctInput').val();
	gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].submit = $('#inputSubmit').val();
	gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].type = $('#inputtype').val();
	gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].text = $('#inputText').val();
	gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].fontSize = inputFontSize;
	gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].lineHeight = inputLineHeight;
	gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].align = $('#inputAlign').val();
	gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].width = inputWidth;
	gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].height = inputHeight;
	gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].top = inputTop;
	gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].left = inputLeft;
	gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].audio = $('#inputAudio').val();
	gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].color = $('#inputColor').val();
	gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].background = $('#inputBackground').val();
	gameData.targetArray[gameData.sequenceNum].input[edit.inputNum].offsetTop = inputOffsetTop;
	
	//update XML
	if($(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs').length == 0){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).append('<inputs/>');	
	}
	
	if($(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').length == 0){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs').append('<input/>');	
	}
	
	$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).attr('type', $('#inputtype').val());
	if($('#inputSubmit').val() == 'true'){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).attr('submit', $('#inputSubmit').val());			
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).removeAttr('submit');
	}
	
	if($('#inputtype').val() == 'blank'){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').attr('correctAnswer', $('#correctInput').val());
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).html('<![CDATA['+$('#inputText').val()+']]>');
	}else if($('#inputtype').val() == 'text'){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).html('<![CDATA['+$('#inputText').val()+']]>');
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).removeAttr('correctAnswer');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).html($('#inputText').val());
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('inputs input').eq(edit.inputNum).removeAttr('correctAnswer');
	}
	
	updateXMLChild('inputs input','fontSize',inputFontSize, true);
	updateXMLChild('inputs input','lineHeight',inputLineHeight, true);
	updateXMLChild('inputs input','left',inputLeft, true);
	updateXMLChild('inputs input','top',inputTop, true);
	updateXMLChild('inputs input','width',inputWidth, true);
	updateXMLChild('inputs input','height',inputHeight, true);
	
	updateXMLChild('inputs input','align',$('#inputAlign').val());
	updateXMLChild('inputs input','audio',$('#inputAudio').val());
	
	updateXMLChild('inputs input','color',$('#inputColor').val());
	updateXMLChild('inputs input','background',$('#inputBackground').val());
	updateXMLChild('inputs input','offsetTop',$('#inputOffsetTop').val());
	
	loadEditQuestion(true);
}

/*!
 * 
 * UPDATE EXPLANATION - This is the function that runs to update explanation value
 * 
 */
function updateExplanation(){
	//update array
	var explanationFontSize = $('#explanationFontSize').val();
	explanationFontSize = explanationFontSize == 0 ? undefined : explanationFontSize;
	var explanationLineHeight = $('#explanationLineHeight').val();
	explanationLineHeight = explanationLineHeight == 0 ? undefined : explanationLineHeight;
	var explanationTop = $('#explanationTop').val();
	explanationTop = explanationTop == 0 ? undefined : explanationTop;
	var explanationLeft = $('#explanationLeft').val();
	explanationLeft = explanationLeft == 0 ? undefined : explanationLeft;
	var explanationWidth = $('#explanationWidth').val();
	explanationWidth = explanationWidth == 0 ? undefined : explanationWidth;
	var explanationHeight = $('#explanationHeight').val();
	explanationHeight = explanationHeight == 0 ? undefined : explanationHeight;
	
	gameData.targetArray[gameData.sequenceNum].explanationType = $('#explanationtype').val();
	gameData.targetArray[gameData.sequenceNum].explanationFontSize = explanationFontSize;
	gameData.targetArray[gameData.sequenceNum].explanationLineHeight = explanationLineHeight;
	gameData.targetArray[gameData.sequenceNum].explanationAlign = $('#explanationAlign').val();
	gameData.targetArray[gameData.sequenceNum].explanationTop = explanationTop;
	gameData.targetArray[gameData.sequenceNum].explanationLeft = explanationLeft;
	gameData.targetArray[gameData.sequenceNum].explanationWidth = explanationWidth;
	gameData.targetArray[gameData.sequenceNum].explanationHeight = explanationHeight;
	gameData.targetArray[gameData.sequenceNum].explanation = $('#explanationText').val();
	gameData.targetArray[gameData.sequenceNum].explanationColor = $('#explanationColor').val();
	gameData.targetArray[gameData.sequenceNum].explanationAudio = $('#explanationAudio').val();
	
	if($(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('explanation').length == 0){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).append('<explanation />');	
	}
	
	//update XML
	$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('explanation').attr('type', $('#explanationtype').val());
	
	if($('#explanationtype').val() == 'text'){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('explanation').html('<![CDATA['+$('#explanationText').val()+']]>');
	}else{
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('explanation').html($('#explanationText').val());
	}
	
	updateXMLFirst('explanation','fontSize',explanationFontSize, true);
	updateXMLFirst('explanation','lineHeight',explanationLineHeight, true);
	updateXMLFirst('explanation','top',explanationTop, true);
	updateXMLFirst('explanation','left',explanationLeft, true);
	updateXMLFirst('explanation','width',explanationWidth, true);
	updateXMLFirst('explanation','height',explanationHeight, true);
	updateXMLFirst('explanation','align',$('#explanationAlign').val());
	updateXMLFirst('explanation','audio',$('#explanationAudio').val());
	updateXMLFirst('explanation','color',$('#explanationColor').val());
	
	loadEditQuestion(true);
}

function updateXMLFirst(item, attr, val, number){
	if(number){
		if(isNaN(val) || val == ''){
			//not number
			$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find(item).removeAttr(attr);
		}else{
			$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find(item).attr(attr, val);
		}
	}else{
		if(val == ''){
			$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find(item).removeAttr(attr);
		}else{
			$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find(item).attr(attr, val);
		}
	}
}

function updateXMLChild(item, attr, val, number){
	var editNum = 0;
	if(item == 'answers answer'){
		editNum = edit.answerNum;
	}else if(item == 'inputs input'){
		editNum = edit.inputNum;
	}else if(item == 'answers answer'){
		editNum = 0;
	}
	
	if(number){
		if(isNaN(val) || val == ''){
			//not number
			$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find(item).eq(editNum).removeAttr(attr);
		}else{
			$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find(item).eq(editNum).attr(attr, val);
		}
	}else{
		if(val == ''){
			$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find(item).eq(editNum).removeAttr(attr);
		}else{
			$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find(item).eq(editNum).attr(attr, val);
		}
	}
}

/*!
 * 
 * GENERATE ARRAY - This is the function that runs to generate array
 * 
 */
function generateXML(){
	var xmlstr = edit.xmlFile.xml ? edit.xmlFile.xml : (new XMLSerializer()).serializeToString(edit.xmlFile);
	$('#outputXML').val(xmlstr);
}

function saveXML(pass){
	var xmlstr = edit.xmlFile.xml ? edit.xmlFile.xml : (new XMLSerializer()).serializeToString(edit.xmlFile);
	
	$.ajax({
		type: "POST",
		url: "save.php",
		data: {password:pass,
				data:xmlstr}
				
	}).done(function(o) {
		try {
			$.parseJSON(o);
		} catch (e) {
			alert('Error, file cannot save!');
		}
		
		var data = $.parseJSON(o);
		if (!data || data === null) {
			alert('Error, file cannot save!');
		}else{
			if(data.status==true){
				alert('File save successful!');
			}else{
				if(data.option==true){
					alert('Wrong password, file cannot save!');
				}else{
					alert('Save option disabled!');
				}
			}
		}
	});	
}

/*!
 * 
 * LOAD TEMPLATE XML - This is the function that runs to load template xml file
 * 
 */
function loadTemplateXML(src){
	$.ajax({
       url: src,
       type: "GET",
       dataType: "xml",
       success: function (result) {
			edit.templateFile = result;
			
			$('#templatelist').empty();
			$(edit.templateFile).find('item').each(function(index, element) {
				$('#templatelist').append($("<option/>", {
					value: index,
					text: $(element).find('landscape question').text()
				}));
            });
       }
	});
}

/*!
 * 
 * SWAP QUESTION - This is the function that runs to swap question
 * 
 */
function swapQuestion(con){
	var tmpLandscape = quesLandscape_arr[edit.sortNum];
	var tmpPortrait = quesPortrait_arr[edit.sortNum];
	var tmpXML = $(edit.xmlFile).find('item').eq(edit.sortNum).clone();
	
	edit.sortNum = Number(edit.sortNum);
	if(con){
		if(edit.sortNum+1 < quesLandscape_arr.length){
			quesLandscape_arr[edit.sortNum] = quesLandscape_arr[edit.sortNum+1];
			quesLandscape_arr[edit.sortNum+1] = tmpLandscape;
			
			quesPortrait_arr[edit.sortNum] = quesPortrait_arr[edit.sortNum+1];
			quesPortrait_arr[edit.sortNum+1] = tmpPortrait;
			
			$(edit.xmlFile).find('item').eq(edit.sortNum).replaceWith($(edit.xmlFile).find('item').eq(edit.sortNum+1).clone());
			$(edit.xmlFile).find('item').eq(edit.sortNum+1).replaceWith(tmpXML);
			
			edit.sortNum++;
		}
	}else{
		if(edit.sortNum-1 >= 0){
			quesLandscape_arr[edit.sortNum] = quesLandscape_arr[edit.sortNum-1];
			quesLandscape_arr[edit.sortNum-1] = tmpLandscape;
			
			quesPortrait_arr[edit.sortNum] = quesPortrait_arr[edit.sortNum-1];
			quesPortrait_arr[edit.sortNum-1] = tmpPortrait;
			
			$(edit.xmlFile).find('item').eq(edit.sortNum).replaceWith($(edit.xmlFile).find('item').eq(edit.sortNum-1).clone());
			$(edit.xmlFile).find('item').eq(edit.sortNum-1).replaceWith(tmpXML);
			
			edit.sortNum--;
		}
	}
	
	filterCategoryQuestion();
	buildQuestionList();
	scrollSelectTo(edit.sortNum);
	loadEditQuestion(false);
}

function scrollSelectTo(num){
	$('#sortquestionslist').prop("selectedIndex", edit.sortNum);
	var $s = $('#sortquestionslist');
	var optionTop = $s.find('[value="'+num+'"]').offset().top;
	var selectTop = $s.offset().top;
	$s.scrollTop($s.scrollTop() + (optionTop - selectTop));
}

/*!
 * 
 * SWAP ANSWER & INPUT - This is the function that runs to swap answer
 * 
 */
function swapAnswer(type, con){
	var xmlElements = type == 'answer' ? 'answers answer' : 'inputs input';
	var tmpLandscape = gameData.targetArray[gameData.sequenceNum][type][edit.sortAnswerNum];
	var tmpXML = $(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find(xmlElements).eq(edit.sortAnswerNum).clone();
	
	edit.sortAnswerNum = Number(edit.sortAnswerNum);
	
	if(con){
		if(edit.sortAnswerNum+1 < gameData.targetArray[gameData.sequenceNum][type].length){
			gameData.targetArray[gameData.sequenceNum][type][edit.sortAnswerNum] = gameData.targetArray[gameData.sequenceNum][type][edit.sortAnswerNum+1];
			gameData.targetArray[gameData.sequenceNum][type][edit.sortAnswerNum+1] = tmpLandscape;
			
			$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find(xmlElements).eq(edit.sortAnswerNum).replaceWith($(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find(xmlElements).eq(edit.sortAnswerNum+1).clone());
			$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find(xmlElements).eq(edit.sortAnswerNum+1).replaceWith(tmpXML);
			
			edit.sortAnswerNum++;
		}
	}else{
		if(edit.sortAnswerNum-1 >= 0){
			gameData.targetArray[gameData.sequenceNum][type][edit.sortAnswerNum] = gameData.targetArray[gameData.sequenceNum][type][edit.sortAnswerNum-1];
			gameData.targetArray[gameData.sequenceNum][type][edit.sortAnswerNum-1] = tmpLandscape;
			
			$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find(xmlElements).eq(edit.sortAnswerNum).replaceWith($(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find(xmlElements).eq(edit.sortAnswerNum-1).clone());
			$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find(xmlElements).eq(edit.sortAnswerNum-1).replaceWith(tmpXML);
			
			edit.sortAnswerNum--;
		}
	}
	
	scrollAnswerSelectTo(edit.sortAnswerNum, type);
	loadEditQuestion(false);
}

function scrollAnswerSelectTo(num, type){
	var targetSelect = type == 'answer' ? '#sortanswerslist' : '#sortinputslist';
	$(targetSelect).prop("selectedIndex", edit.sortAnswerNum);
	var $s = $(targetSelect);
	var optionTop = $s.find('[value="'+num+'"]').offset().top;
	var selectTop = $s.offset().top;
	$s.scrollTop($s.scrollTop() + (optionTop - selectTop));
}

/*!
 * 
 * BUILD CATEGORY LIST - This is the function that runs to build category list
 * 
 */
function buildEditCategory(){
	$('#categorylist').empty();
	$('#category').empty();
	
	$(edit.xmlFile).find('thumb').each(function(index, element) {
		$('#categorylist').append($("<option/>", {
			value: index,
			text: $(element).attr('name')
		}));
		
		$('#category').append($("<option/>", {
			value: $(element).attr('name'),
			text: $(element).attr('name')
		}));
	});
	
	edit.categoryNum = 0;
	loadEditCategory();
}


/*!
 * 
 * LOAD CATEGORY VALUE - This is the function that runs to load category list
 * 
 */
function loadEditCategory(){
	$('#categoryName').val($(edit.xmlFile).find('thumb').eq(edit.categoryNum).attr('name'));
	$('#categoryThumbnail').val($(edit.xmlFile).find('thumb').eq(edit.categoryNum).text());
}

/*!
 * 
 * ACTION CATEGORY - This is the function that runs to action category
 * 
 */
function actionCategory(con){
	if(con == 'add'){
		var newTemplate = '<thumb name="CATEGORY">assets/item_thumb.png</thumb>';
		$(edit.xmlFile).find('category').eq(0).append(newTemplate);
	}else{
		$(edit.xmlFile).find('thumb').eq(edit.categoryNum).remove();
		edit.categoryNum = 0;
	}
	
	buildEditCategory();
}

/*!
 * 
 * UPDATE CATEGORY - This is the function that runs to update category
 * 
 */
function updateCategory(){
	$(edit.xmlFile).find('thumb').eq(edit.categoryNum).attr('name', $('#categoryName').val());
	$(edit.xmlFile).find('thumb').eq(edit.categoryNum).text($('#categoryThumbnail').val());
	buildEditCategory()
}

/*!
 * 
 * BUILD QUESTION LIST - This is the function that runs to build question list
 * 
 */
function buildQuestionList(){
	$('#questionslist').empty();
	$('#sortquestionslist').empty();
	
	for(n=0;n<quesLandscape_arr.length;n++){
		$('#questionslist').append($("<option/>", {
			value: n,
			text: 'Question '+(n+1)+' : ('+quesLandscape_arr[n].question+')'
		}));
		$('#sortquestionslist').append($("<option/>", {
			value: n,
			text: (n+1)+' : '+quesLandscape_arr[n].question
		}));
	}
	
	$('#questionslist').prop("selectedIndex", gameData.sequenceNum);	
}

function getEditAlign(data){
	var dataAlign = 1;
	if(data == undefined){
		dataAlign = 1;
	}else{
		if(data == 'left'){
			dataAlign = 0;	
		}else if(data == 'center'){
			dataAlign = 1;
		}else{
			dataAlign = 2;	
		}
	}
	
	return dataAlign;	
}

function getEditBoolean(data){
	var videoAutoplay = 0;
	if(data == undefined || data == 'true'){
		videoAutoplay = 0;
	}else{
		videoAutoplay = 1;	
	}
	return videoAutoplay;	
}

function checkXMLChild(){
	if($(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).find('videos').length == 0){
		$(edit.xmlFile).find('item').eq(gameData.sequenceNum).find(edit.mode).append('<videos/>');	
	}
}

function setBorderFocus(){
	$('.question').removeClass('editBorderFocus');
	$('#answerHolder .buttonClick').removeClass('editBorderFocus');
	$('#answerHolder .dropLabel').removeClass('editBorderFocus');
	$('#inputHolder .input').removeClass('editBorderFocus');
	$('#inputHolder .buttonClick').removeClass('editBorderFocus');
	$('#videoHolder').removeClass('editBorderFocus');
	$('.explanation').removeClass('editBorderFocus');
	
	if(edit.con == 'question'){
		$('.question').addClass('editBorderFocus');
	}else if(edit.con == 'answers'){
		if($('#answer'+edit.answerNum).hasClass('buttonClick')){
			$('#answer'+edit.answerNum).addClass('editBorderFocus');		
		}
		$('#answer'+edit.answerNum+' .buttonClick').addClass('editBorderFocus');
		$('#dropLabel'+edit.answerNum).addClass('editBorderFocus');
	}else if(edit.con == 'inputs'){
		if($('#input'+edit.inputNum).find('.buttonClick').length > 0){
			$('#input'+edit.inputNum+' .buttonClick').addClass('editBorderFocus');		
		}else{
			$('#input'+edit.inputNum).addClass('editBorderFocus');	
		}
	}else if(edit.con == 'video'){
		$('#videoHolder').addClass('editBorderFocus');
	}else if(edit.con == 'explanation'){
		$('.explanation').addClass('editBorderFocus');
	}
}