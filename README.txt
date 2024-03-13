Configuration:
    - Unix Shell: add x permission to *.sh files.  Veryify that launcher scripts are LF not CRLF.
    - cmd.exe: change DOCKER_HOST uri to an accessible remote host.  Accessible meaning that the localhost must have SSH access permissions to the remote host.  Recommended: ssh-keygen.

Launching Application:
    - localhost on port 80: 
        * execute the runl script.  No SSL will be attempted.
    - remotehost on port 443: 
        * Place the necessary valid certificates in the folder specified by $hpath in cpcrt.sh. (To attain these certs, the server will first have to run on the domain, but on port 80)
        * execute the crprt script on a Unix shell.
        * execute the run script
