---
layout: default
title:  "About"
description: "About me"
permalink: /about
disableTitleInPost: true
disable-navigation: true
scripts:
    # - "https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.min.js"
    # - "https://html2canvas.hertzen.com/dist/html2canvas.js"
    - "../scripts/styleSwitch.js"
    # - "../scripts/saveAsPdf.js"
scripts-onload: 
    - "updateStyle('pdf-style', 'styled');"
---
<div class="about-page-main">
    <div class="entries-list reveal">
        <h1 class="about-page-label firedef">about me</h1>
        {% include navigation.html %}
        {% include links.html %}


        <div class="horizontal-container">
            <button class="resume-switch-style-button" onclick="toggleStyle('pdf-style', 'styled', 'normal');"><i class="fa-solid fa-brush icon"></i></button>
            <button class="download-pdf-button tooltip"><i class="fa-solid fa-file-arrow-down icon"></i>download pdf<div class="tooltiptext">no pdf yet:(</div></button>
        </div>


        <div class="resume-panel">
            <div class="grid-container resume">
                <div class="item1">Dmitrii Nosov</div>
                <div class="item2"><img class="ugly-photo" src="/images/Other/dude.jpg" /></div>
                <div class="item3">
                    Hi! My name is Mitya, i'm a self-taught programmer with <b>4 years of non-commercial and 1.5 of commercial experience</b>. I love <b>low-level code, optimizations, science and graphics</b>.
                    <br/>
                    <br/>
                    I`m very curious - always open to learning something new and not afraid of challenging tasks. I can write compact and performant code in different languages, design architecture of complex applications.
                    <br/>
                    <br/>
                    While i prefer to use <b>C#</b> In my projects, I also know <b>C</b> and modern <b>C++</b>. Sometimes I'm using Python for simple tasks.
                    <br/>
                    I find low level programming very interesting. I know C, C++, <b>IL code</b> (C# bytecode), familar with different <b>assemblies (NASM, MASM)</b> and <b>Spir-V</b> (Vulkan bytecode). Lot's of <b>unmanaged code</b> in critical paths makes my C# code fast.
                    <br/>
                    I love to work with graphics. Almost all design of this site was made by me using html, sass and js. Sometimes i experiment with shaders in <b>GLSL</b>, HLSL (Unity) and blender shader nodes. I worked a lot with <b>OpenGl</b> and familar with <b>Vulkan</b>.
                    <br/>
                    I'm not a sciencist, i study it with passion from childhood. Theoretical physics, chemistry and astronomy are my main interest but i like any popular science. In simple terms, i like everything mindblowing or something that tries to explain how this world works.
                    <br/>
                    <br/>
                    I'm using Arch btw. Jokes aside, this give me deep understanding on how computer works. After many years of Windows, i realized how important cross-platform code. Now i care about compatibility and i'm trying make user experience great on different platforms.
                    <br/>
                    <br/>
                    By commercial experience i mean our fintech startup. The project is far from complete, but we have a team of traders, mathematicians and programmers working on it. I'm a lead programmer here - my responsibility is to design app architecture, make code-related decisions, write core and control code quality. 
                </div>
                <div class="item4">
                    <h3>Contacts:</h3>
                    <b>
                    <a href="https://github.com/firedef"><i class="fab fa-github noHover icon"></i>github.com/firedef<br/></a>
                    <a href="mailto://firedef2019@gmail.com"><i class="fa-solid fa-envelope-open-text noHover icon"></i>firedef2019@gmail.com<br/></a>
                    <a href="https://t.me/firedef"><i class="fab fa-telegram-plane noHover icon"></i>t.me/firedef<br/></a>
                    <a href="https://bit.ly/linked-firedef"><i class="fab fa-linkedin noHover icon"></i>bit.ly/linked-firedef<br/></a>
                    </b>
                    <br/>

                    <h3>My skills:</h3>
                    <b>
                    <i class="fa-regular fa-file-code icon"></i>C#, C, C++<br/>
                    <i class="fa-solid fa-gears icon"></i>x86 Asm, Spir-V, MSIL<br/>
                    <!-- <i class="fa-solid fa-globe icon"></i>Html, Css, Js<br/> -->
                    <i class="fa-solid fa-laptop icon"></i>Linux, Windows<br/>
                    <i class="fa-solid fa-draw-polygon icon"></i>OpenGl, Vulkan, GLSL<br/>
                    <!-- <i class="fa-solid fa-dollar-sign icon"></i>FinTech<br/> -->
                    <i class="fa-solid fa-bolt icon"></i>Optimizations<br/>
                    <i class="fa-solid fa-microchip icon"></i>Low-level code<br/>
                    </b>
                    <br/>

                    <h3>Languages:</h3>
                    <b>
                    <i class="fa-solid fa-earth-europe icon"></i>Russian<br/>
                    <i class="fa-solid fa-globe icon"></i>English<br/>
                    </b>
                </div>
                <div class="item5"></div>
            </div>
        </div>



        <div class="resume-panel-small">
            <img class="ugly-photo" src="/images/Other/dude.jpg" />
            Hi! My name is Mitya, i'm a self-taught programmer with <b>4 years of non-commercial and 1.5 of commercial experience</b>. I love <b>low-level code, optimizations, science and graphics</b>.
            <br/>
            <br/>
            I`m very curious - always open to learning something new and not afraid of challenging tasks. I can write compact and performant code in different languages, design architecture of complex applications.
            <br/>
            <br/>
            While i prefer to use <b>C#</b> In my projects, I also know <b>C</b> and modern <b>C++</b>. Sometimes I'm using Python for simple tasks.
            <br/>
            I find low level programming very interesting. I know C, C++, <b>IL code</b> (C# bytecode), familar with different <b>assemblies (NASM, MASM)</b> and <b>Spir-V</b> (Vulkan bytecode). Lot's of <b>unmanaged code</b> in critical paths makes my C# code fast.
            <br/>
            I love to work with graphics. Almost all design of this site was made by me using html, sass and js. Sometimes i experiment with shaders in <b>GLSL</b>, HLSL (Unity) and blender shader nodes. I worked a lot with <b>OpenGl</b> and familar with <b>Vulkan</b>.
            <br/>
            I'm not a sciencist, i study it with passion from childhood. Theoretical physics, chemistry and astronomy are my main interest but i like any popular science. In simple terms, i like everything mindblowing or something that tries to explain how this world works.
            <br/>
            <br/>
            I'm using Arch btw. Jokes aside, this give me deep understanding on how computer works. After many years of Windows, i realized how important cross-platform code. Now i care about compatibility and i'm trying make user experience great on different platforms.
            <br/>
            <br/>
            By commercial experience i mean our fintech startup. The project is far from complete, but we have a team of traders, mathematicians and programmers working on it. I'm a lead programmer here - my responsibility is to design app architecture, make code-related decisions, write core and control code quality. 
            
        </div>

        <div class="entries-list">
            <div class="horizontal-container">
            <a class="card nav-button" href="#skills"><i class="fa-solid fa-chevron-down"></i></a>
            </div>
        </div>
    </div>
</div>

<!-- <div class="about-page-main waypoint">
    <div class="entries-list reveal">
        <h1 class="about-page-label firedef">about me</h1>
        {% include navigation.html %}
        {% include links.html %}
        <div class="horizontal-container noHover nowrap card about-first">
            <img class="ugly-photo" src="/images/Other/dude.png" />
            <div class="about-text first">
Hi! My name is Mitya, i'm a self-taught programmer with <b>4 years of non-commercial and 1.5 of commercial experience</b>. I love <b>low-level code, optimizations, science and graphics</b>.
            </div>
        </div>
        <div class="horizontal-container noHover nowrap about-second">
            <div class="about-text second">
I`m very curious - always open to learning something new and not afraid of challenging tasks. I can write compact and performant code in different languages, design architecture of complex applications.
<br/>
<br/>
While i prefer to use <b>C#</b> In my projects, I also know <b>C</b> and modern <b>C++</b>. Sometimes I'm using Python for simple tasks.
<br/>
I find low level programming very interesting. I know C, C++, <b>IL code</b> (C# bytecode), familar with different <b>assemblies (NASM, MASM)</b> and <b>Spir-V</b> (Vulkan bytecode). Lot's of <b>unmanaged code</b> in critical paths makes my C# code fast.
<br/>
I love to work with graphics. Almost all design of this site was made by me using html, sass and js. Sometimes i experiment with shaders in <b>GLSL</b>, HLSL (Unity) and blender shader nodes. I worked a lot with <b>OpenGl</b> and familar with <b>Vulkan</b>.
<br/>
I'm not a sciencist, i study it with passion from childhood. Theoretical physics, chemistry and astronomy are my main interest but i like any popular science. In simple terms, i like everything mindblowing or something that tries to explain how this world works.
            </div>
        </div>
        <div class="horizontal-container noHover nowrap about-third">
            <div class="about-text third">
I'm using Arch btw. Jokes aside, this give me deep understanding on how computer works. After many years of Windows, i realized how important cross-platform code. Now i care about compatibility and i'm trying make user experience great on different platforms.
<br/>
<br/>
By commercial experience i mean our fintech startup. The project is far from complete, but we have a team of traders, mathematicians and programmers working on it. I'm a lead programmer here - my responsibility is to design app architecture, make code-related decisions, write core and control code quality. 

            </div>
        </div>
        <div class="entries-list">
            <div class="horizontal-container">
            <a class="card nav-button" href="#skills"><i class="fa-solid fa-chevron-down"></i></a>
            </div>
        </div>
    </div>
</div> -->

<div class="about-page-skills waypoint">
    <h1 id="skills" class="about-page-label skills">my skills</h1>
    <div class="entries-list reveal">      
        {% include myTech.html %}
    </div>
    <br/>
    <br/>
    <h1 class="about-page-label reviews">reviews</h1>
    <div class="entries-list reveal">      
        <div class="vertical-container nowrap card yellow review">
            <div class="review-text quote-text">
For 1.5 years we have been working with Dmitrii on a common project in fintech. He has established himself as an expert in .NET technologies, helped solve many complex problems and create a project architecture from scratch. Dmitrii is responsible, knows how to find solutions to complex issues, and is always ready to help.
            </div>
            <a class="review-text-sub" href="https://www.linkedin.com/feed/update/urn:li:activity:6968080111396937728/">
Yaroslav Kazakov, Sitecore Developer at Brimit
            </a>
        </div>
        <div class="vertical-container nowrap card yellow review">
            <div class="review-text quote-text">
We have been working with Dmitrii on a fintech project for a year and a half now. He proved himself to be a great specialist in .NET, able to solve problems of any complexity, quickly and efficiently understand issues that he had not encountered before, very responsible and able to set himself tasks. In the team, Dmitrii was involved in the development of the project architecture from scratch and did it very successfully.
            </div>
            <a class="review-text-sub" href="https://www.linkedin.com/feed/update/urn:li:activity:6977589346174418944/">
Uladzislau Ilyinau, Senior student of American University in Dubai
            </a>
        </div>
    </div>
</div>

<div class="about-page-end waypoint">
</div>