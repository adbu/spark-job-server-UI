function getJobs() {
  $.getJSON(
    '/jobs',
    '',
    function(jobs) {
      $('#failedJobsTable tbody').empty();
      $('#runningJobsTable tbody').empty();
      $('#completedJobsTable tbody').empty();

      $.each(jobs, function(key, job) {
        var items = [];
        items.push("<tr>");
        items.push("<td><a href='./jobs/" + job.jobId + "'>" + job.jobId + "</a> (<a href='./jobs/" + job.jobId + "/config'>C</a>)</td>");
        items.push("<td>" + job.classPath + "</td>");
        items.push("<td>" + job.context + "</td>");
        items.push("<td>" + job.startTime + "</td>");
        items.push("<td>" + job.duration + "</td>");
        if(job.status == 'RUNNING') {
            items.push("<td><a href='javascript:void(0)' onclick='killJob(this, \"" + job.jobId + "\");'>KILL</a></td>");
        } else {
            items.push("<td><a href='javascript:void(0)' onclick='deleteJob(this, \"" + job.jobId + "\");'>DELETE</a></td>");
        }
        items.push("</tr>");

        if(job.status == 'ERROR') {
          $('#failedJobsTable > tbody:last').append(items.join(""));
        } else if(job.status == 'RUNNING') {
          $('#runningJobsTable > tbody:last').append(items.join(""));
        } else {
          $('#completedJobsTable > tbody:last').append(items.join(""));
        }
      });

      refreshJobsCount();
    });
}

function refreshJobsCount() {
    var runningJobsCount = $('#runningJobsTable tbody').children("tr").length;
    var completedJobsCount = $('#completedJobsTable tbody').children("tr").length;
    var failedJobsCount = $('#failedJobsTable tbody').children("tr").length;
    $('#runningJobsCount').html(runningJobsCount);
    $('#completedJobsCount').html(completedJobsCount);
    $('#failedJobsCount').html(failedJobsCount);
}

/**
 * kill job
 * @param element
 * @param jobId
 */
function killJob(element, jobId) {
    if(jobId){
        $.ajax({
            type: 'DELETE',
            url: './jobs/' + jobId,
            success: function(data){
                getJobs();
                if(data && data.status == 'KILLED'){
                    alert("Operation succeeded !");
                }
            },
            error: function(){
                alert("Operation failed !");
            }
        });
    }
}

/**
 * 删除job
 * @param element
 * @param jobId
 */
function deleteJob(element, jobId) {
    if(jobId){
        $.ajax({
            type: 'DELETE',
            url: './jobs/' + jobId,
            success: function(data){
                if(data && data.status == 'DELETED'){
                    if(element){
                        $(element).parentsUntil("tbody").remove();
                    }
                    refreshJobsCount();
                    alert("Operation succeeded !");
                } else {
                    alert("Operation failed !");
                }
            },
            error: function(){
                alert("Operation failed !");
            }
        });
    }
}

function clearJobs(type) {
    var targetTable = $('#completedJobsTable tbody');
    if(type && type > 0){
        targetTable = $('#failedJobsTable tbody');
    }
    targetTable.children("tr").each(function(){
        var trEle = $(this);
        var jobId = $(this).children("td:first").children("a:first").text();
        if(jobId){
            $.ajax({
                type: 'DELETE',
                url: './jobs/' + jobId,
                success: function(data){
                    if(data && data.status == 'DELETED'){
                        trEle.remove();
                        refreshJobsCount();
                    }
                },
                error: function(){}
            });
        }
    });
}

function getContexts() {
  $.getJSON(
    '/contexts',
    '',
    function(contexts) {
      $('#contextsTable tbody').empty();

      $.each(contexts, function(key, contextName) {
        var items = [];
        items.push("<tr><td>" + contextName + "</td></tr>");
        $('#contextsTable > tbody:last').append(items.join(""));
      });
    });
}

function getJars() {
  $.getJSON(
    '/jars',
    '',
    function(jars) {
      $('#jarsTable tbody').empty();

      $.each(jars, function(jarName, deploymentTime) {
        var items = [];
        items.push("<tr>");
        items.push("<td>" + jarName + "</td>");
        items.push("<td>" + deploymentTime + "</td>");
        items.push("</tr>");
        $('#jarsTable > tbody:last').append(items.join(""));
      });
    });
}

$(document).ready(getJobs());
$(document).ready(getContexts());
$(document).ready(getJars());

$(function () {
  $('#navTabs a[data-toggle="tab"]').on('show.bs.tab', function (e) {
    var target = $(e.target).attr("href");

    if (target == '#jobs') {
      getJobs();
    } else if (target == "#contexts") {
      getContexts();
    } else {
      getJars();
    }
  })
});
