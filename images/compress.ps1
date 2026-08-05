Add-Type -AssemblyName System.Drawing
function Save-Jpeg($inputPath, $outputPath, $quality) {
    $img = [System.Drawing.Image]::FromFile($inputPath)
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $quality)
    $img.Save($outputPath, $codec, $params)
    $img.Dispose()
}
Save-Jpeg 'Manuel.png' 'manuel-test.jpg' 70
Save-Jpeg 'office.png' 'office-test.jpg' 70
Get-Item 'manuel-test.jpg','office-test.jpg' | Select-Object Name,Length
